import React, { ReactElement } from 'react';
import ReactDOM from 'react-dom';
import escape from 'lodash/escape';
import * as empanada from 'empanada';

import { decodeURLParameter } from '../utils/decodeURLParameter';
import { convertLocationSearchToObject } from '../utils/convertLocationSearchToObject';

interface SetupSandboxSettingsDependency {
  name: string;
  slug: string;
  exec: unknown;
}

interface SetupSandboxSettings {
  root?: string | HTMLElement;
  dependencies?: SetupSandboxSettingsDependency[];
}

const getImportsRefsCode = (
  dependencies: SetupSandboxSettingsDependency[],
  importsLines: string[]
): string => {
  return importsLines
    .map((line) => {
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
        throw new Error(`Sandbox dependency "${from}" was not found.`);
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

      return newNamesList
        .map((newNamesItem) => {
          // Remove if it has already been declared by the function.
          if (newNamesItem === dependency.slug) {
            return '';
          }

          return `const ${newNamesItem} = ${dependency.slug};\n`;
        })
        .join('');
    })
    .filter(Boolean)
    .join('');
};

const setupSandbox = (settings: SetupSandboxSettings = {}): void => {
  const { root, dependencies: dependenciesProvided = [] } = settings;

  const render = (element: ReactElement): void => {
    ReactDOM.render(element, rootElement);
  };

  const dependencies: SetupSandboxSettingsDependency[] = [
    {
      name: 'react',
      slug: 'React',
      exec: React
    },
    {
      name: 'render',
      slug: 'render',
      exec: render
    },
    {
      name: 'empanada',
      slug: 'empanada',
      exec: empanada
    },
    ...dependenciesProvided
  ];

  const rootElement =
    root instanceof HTMLElement
      ? root
      : (document.querySelector(root || '#root') as HTMLElement);

  try {
    const parameters = convertLocationSearchToObject(window.location.search);

    if (parameters.error) {
      throw new Error(decodeURLParameter(parameters.error));
    }

    const importsLines: string[] = JSON.parse(
      decodeURLParameter(parameters.importsLines)
    );
    const importsRefsCode = getImportsRefsCode(dependencies, importsLines);
    const codeRaw = decodeURLParameter(parameters.code);

    if (!codeRaw) {
      throw new Error('No valid source code provided.');
    }

    const dependenciesNames = dependencies.map(({ slug }) => slug);
    const dependenciesPackages = dependencies.map(({ exec }) => exec);
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
    rootElement.innerHTML = `
      <div style="overflow-x:auto;">
        <pre style="margin:0;padding:0;">${errorMessage}</pre>
      </div>
    `;

    throw error;
  }
};

export type { SetupSandboxSettings };
export { setupSandbox };
