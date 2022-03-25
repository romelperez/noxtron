import React from 'react';
import ReactDOM from 'react-dom';
import escape from 'lodash/escape';
import uniqBy from 'lodash/uniqBy';
import flatten from 'lodash/flatten';
import * as empanada from 'empanada';

import type {
  NTUserSandboxConfigDependency,
  NTUserSandboxConfig
} from '../types';
import { decodeURLParameter } from '../utils/decodeURLParameter';
import { convertLocationSearchToObject } from '../utils/convertLocationSearchToObject';

interface SandboxDependency extends NTUserSandboxConfigDependency {
  slug: string;
}

interface SandboxImportsRef {
  values: string;
  dependencyName: string;
  dependencySlug: string;
}

const getImportsRefsFragments = (
  dependencies: SandboxDependency[],
  importsLines: string[]
): SandboxImportsRef[] => {
  const lists = importsLines.map((line) => {
    // Types not needed.
    if (line.trim().startsWith('import type ')) {
      return [];
    }

    const fragments = line.trim().split(/(import|from)/);
    const [, , namesProvided, , fromProvided] = fragments;
    const names = namesProvided.trim().replace(/\s{1,}/g, ' ');
    const from = fromProvided.trim().replace(/["';]/g, '');

    const dependency = dependencies.find((dep) => dep.name === from);

    if (!dependency) {
      throw new Error(`Sandbox dependency "${from}" is not available.`);
    }

    const newNamesList: string[] = [];

    // Format: "{ a, b, c }"
    if (/^\{.+\}$/.test(names)) {
      newNamesList.push(names.replace(' as ', ': '));
    }
    // Format: "a, { b, c }" and "a, { b as x, c }"
    else if (/.+\,\s*\{.+\}/.test(names)) {
      const [nameMainRaw] = names.match(/.+\,\s*\{/) || [];
      const [nameDes] = names.match(/\{.+\}/) || [];
      const nameMain = nameMainRaw.replace(/\,\s*\{/, '').trim();

      // Remove if it has already been declared by the function.
      if (nameMain !== dependency.slug) {
        newNamesList.push(nameMain);
      }

      newNamesList.push(nameDes);
    }
    // Format: "* as a"
    else if (/^\* as /.test(names)) {
      newNamesList.push(names.replace('* as ', ''));
    }
    // Format: "a" and errors
    else {
      newNamesList.push(names);
    }

    return newNamesList.map((newNamesItem) => {
      return {
        values: newNamesItem,
        dependencyName: dependency.name,
        dependencySlug: dependency.slug
      } as SandboxImportsRef;
    });
  });
  return flatten(lists);
};

const getImportsRefsCode = (importsRefs: SandboxImportsRef[]): string => {
  return importsRefs
    .map(
      ({ values, dependencySlug }) => `const ${values} = ${dependencySlug};\n`
    )
    .join('');
};

const setupSandbox = (settings: NTUserSandboxConfig = {}): void => {
  const { dependencies: dependenciesProvided = [] } = settings;

  try {
    const parameters = convertLocationSearchToObject(window.location.search);

    if (parameters.error) {
      throw new Error(decodeURLParameter(parameters.error));
    }

    const codeRaw = decodeURLParameter(parameters.code);

    if (!codeRaw) {
      throw new Error('No valid source code provided.');
    }

    const userDependenciesAvailable: NTUserSandboxConfigDependency[] = [
      { name: 'react', pkg: React },
      { name: 'react-dom', pkg: ReactDOM },
      { name: 'empanada', pkg: empanada },
      ...dependenciesProvided
    ];

    // Dependencies available for the sandbox to use but not injected until
    // explicitely defined in the source code.
    const dependenciesAvailable: SandboxDependency[] =
      userDependenciesAvailable.map((dep) => {
        const nameSlug = dep.name.toUpperCase().replace(/[^A-Za-z0-9]/, '_');
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
    const importsRefs = getImportsRefsFragments(
      dependenciesAvailable,
      importsLines
    );

    // Dependencies to pass to the sandbox executor.
    const dependenciesToInject: SandboxDependency[] = uniqBy(
      importsRefs,
      (importRef) => importRef.dependencySlug
    )
      .map((importRef) =>
        dependenciesAvailable.find(
          (dependency) => dependency.name === importRef.dependencyName
        )
      )
      .filter(Boolean) as SandboxDependency[];

    const importsRefsCode = getImportsRefsCode(importsRefs);
    const dependenciesNames = dependenciesToInject.map(({ slug }) => slug);
    const dependenciesPackages = dependenciesToInject.map(({ pkg }) => pkg);
    const codeWrap = `${importsRefsCode};\n\n${codeRaw};`;
    const fn = new Function(...dependenciesNames, codeWrap);

    fn(...dependenciesPackages);
  } catch (error: unknown) {
    Object.assign(document.body.style, {
      margin: '0px',
      padding: '20px',
      fontFamily: 'monospace',
      fontSize: '16px',
      color: '#f44',
      backgroundColor: '#151515'
    });

    const errorMessage =
      error instanceof Error
        ? escape(String(error))
        : 'ERROR: Source code processing error.';

    const rootElement = document.querySelector('#root') as HTMLElement;
    rootElement.innerHTML = `
      <div style="overflow-x:auto;">
        <pre style="margin:0;padding:0 0 20px;">${errorMessage}</pre>
      </div>
    `;

    // Still throw the error in case it is not shown properly in the UI.
    throw error;
  }
};

export { setupSandbox };
