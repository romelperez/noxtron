import React from 'react';
import ReactDOM from 'react-dom';
import escape from 'lodash/escape';
import * as empanada from 'empanada';

import type {
  NTUserSandboxSettingsDependency,
  NTUserSandboxSettings
} from '../types';
import { decodeURLParameter } from '../utils/decodeURLParameter';
import { convertLocationSearchToObject } from '../utils/convertLocationSearchToObject';

interface SandboxImportsRef {
  names: string;
  from: string;
  slug: string;
}

const getImportsRefsFragments = (
  dependencies: NTUserSandboxSettingsDependency[],
  importsLines: string[]
): SandboxImportsRef[] => {
  const importsRefsFragments: SandboxImportsRef[] = [];

  importsLines.forEach((line) => {
    // Types not needed.
    if (line.trim().startsWith('import type ')) {
      return '';
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
        newNamesList.push(`{ default: ${nameMain} }`);
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

    newNamesList.forEach((newNamesItem) => {
      importsRefsFragments.push({
        names: newNamesItem,
        from: dependency.name,
        slug: dependency.slug
      });
    });
  });

  return importsRefsFragments;
};

const getImportsRefsCode = (
  dependencies: NTUserSandboxSettingsDependency[],
  importsRefs: SandboxImportsRef[]
): string => {
  return importsRefs
    .filter(({ names, from }) => {
      const dependency = dependencies.find((dep) => dep.name === from);
      return dependency?.slug !== names;
    })
    .map(({ names, slug }) => `const ${names} = ${slug};\n`)
    .join('');
};

const setupSandbox = (settings: NTUserSandboxSettings = {}): void => {
  const { dependencies: dependenciesProvided = [] } = settings;

  try {
    const parameters = convertLocationSearchToObject(window.location.search);

    if (parameters.error) {
      throw new Error(decodeURLParameter(parameters.error));
    }

    const dependenciesAvailable: NTUserSandboxSettingsDependency[] = [
      {
        name: 'react',
        slug: 'React',
        pkg: React
      },
      {
        name: 'react-dom',
        slug: 'ReactDOM',
        pkg: ReactDOM
      },
      {
        name: 'empanada',
        slug: 'empanada',
        pkg: empanada
      },
      ...dependenciesProvided
    ];

    const importsLines: string[] = JSON.parse(
      decodeURLParameter(parameters.importsLines)
    );
    const importsRefs = getImportsRefsFragments(
      dependenciesAvailable,
      importsLines
    );

    const dependenciesToInject: NTUserSandboxSettingsDependency[] = importsRefs
      .map((importRef) =>
        dependenciesAvailable.find(
          (dependency) => dependency.name === importRef.from
        )
      )
      .filter(Boolean) as NTUserSandboxSettingsDependency[];

    const importsRefsCode = getImportsRefsCode(
      dependenciesAvailable,
      importsRefs
    );
    const codeRaw = decodeURLParameter(parameters.code);

    if (!codeRaw) {
      throw new Error('No valid source code provided.');
    }

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
        <pre style="margin:0;padding:0;">${errorMessage}</pre>
      </div>
    `;

    // Still throw the error in case it is not shown properly in the UI.
    throw error;
  }
};

export { setupSandbox };
