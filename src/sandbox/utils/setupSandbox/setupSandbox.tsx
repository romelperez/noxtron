import escape from 'lodash/escape';
import uniqBy from 'lodash/uniqBy';

import type { NTSandboxDependency, NTAppSandboxSettings } from '../../../types';
import { decodeURLParameter } from '../../../utils/decodeURLParameter';
import { convertLocationSearchToObject } from '../../../utils/convertLocationSearchToObject';
import { getCodeImportsRefsFragments } from '../getCodeImportsRefsFragments';
import { getCodeImportsRefsCode } from '../getCodeImportsRefsCode';

const setupSandbox = (getSettings: () => NTAppSandboxSettings): void => {
  const settings = getSettings?.() || {};
  const { dependencies: userDependenciesAvailable = [] } = settings;

  try {
    const parameters = convertLocationSearchToObject(window.location.search);

    if (parameters.error) {
      throw new Error(decodeURLParameter(parameters.error));
    }

    const codeRaw = decodeURLParameter(parameters.code);

    if (!codeRaw) {
      throw new Error('No valid source code provided.');
    }

    // Dependencies available for the sandbox to use but not injected until
    // explicitely defined in the source code.
    const dependenciesAvailable: NTSandboxDependency[] =
      userDependenciesAvailable.map((dep) => {
        const nameSlug = dep.name.toUpperCase().replace(/[^A-Za-z0-9]/g, '_');
        return {
          ...dep,
          // To prevent the user from using dependencies without explicitely
          // defining their names and to allow organization packages, a slug name
          // is used to pass the dependency to the sandbox executor.
          slug: `__NOXTRON_${nameSlug}__`
        };
      });

    const importsLines: string[] = JSON.parse(
      decodeURLParameter(parameters.importsLines)
    );
    const importsRefs = getCodeImportsRefsFragments(
      dependenciesAvailable,
      importsLines
    );

    // Dependencies to pass to the sandbox executor.
    const dependenciesToInject: NTSandboxDependency[] = uniqBy(
      importsRefs,
      (importRef) => importRef.dependencySlug
    )
      .map((importRef) =>
        dependenciesAvailable.find(
          (dependency) => dependency.name === importRef.dependencyName
        )
      )
      .filter(Boolean) as NTSandboxDependency[];

    const importsRefsCode = getCodeImportsRefsCode(importsRefs);
    const dependenciesNames = dependenciesToInject.map(({ slug }) => slug);
    const dependenciesPackages = dependenciesToInject.map(({ pkg }) => pkg);
    const codeWrap = `${importsRefsCode};\n\n${codeRaw};`;
    const fn = new Function(...dependenciesNames, codeWrap);

    fn(...dependenciesPackages);
  } catch (error: unknown) {
    Object.assign(document.body.style, {
      boxSizing: 'border-box',
      overflow: 'auto',
      margin: '0px',
      padding: '20px',
      width: '100%',
      minHeight: '100vh',
      fontFamily: 'monospace',
      fontSize: '16px',
      color: '#f44',
      backgroundColor: '#151515'
    });

    const errorMessage =
      error instanceof Error
        ? escape(String(error))
        : 'ERROR: Source code processing error.';

    document.body.innerHTML = `
      <pre style="
        display: block;
        border: 0px;
        margin: 0px;
        padding: 0px;
      ">${errorMessage}</pre>
    `;

    // Still throw the error in case it is not shown properly in the UI.
    throw error;
  }
};

export { setupSandbox };
