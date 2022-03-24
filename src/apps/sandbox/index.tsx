import React, { ReactElement } from 'react';
import ReactDOM from 'react-dom';
import escape from 'lodash/escape';
import * as empanada from 'empanada';

import { decodeURLParameter } from '../utils/decodeURLParameter';
import { convertLocationSearchToObject } from '../utils/convertLocationSearchToObject';

interface SetupSandboxSettingsDependency {
  name: string;
  pkg: unknown;
}

interface SetupSandboxSettings {
  root?: string | HTMLElement;
  dependencies?: SetupSandboxSettingsDependency[];
}

const setupSandbox = (settings: SetupSandboxSettings = {}): void => {
  const { root, dependencies = [] } = settings;

  const rootElement =
    root instanceof HTMLElement
      ? root
      : (document.querySelector(root || '#root') as HTMLElement);

  try {
    const parameters = convertLocationSearchToObject(window.location.search);

    if (parameters.error) {
      throw new Error(decodeURLParameter(parameters.error));
    }

    const codeRaw = decodeURLParameter(parameters.code);

    if (!codeRaw) {
      throw new Error('No valid source code provided.');
    }

    const dependenciesNames = [
      'React',
      'render',
      'empanada',
      ...dependencies.map(({ name }) => name)
    ];

    const render = (element: ReactElement): void => {
      ReactDOM.render(element, rootElement);
    };

    const dependenciesPackages = [
      React,
      render,
      empanada,
      ...dependencies.map(({ pkg }) => pkg)
    ];

    const codeWrap = `(function () { ${codeRaw}; })();`;
    const fn = new Function(...dependenciesNames, codeWrap);

    fn(...dependenciesPackages);
  } catch (error: unknown) {
    Object.assign(document.body.style, {
      margin: '20px',
      fontFamily: 'monospace',
      fontSize: '16px',
      color: '#f44',
      backgroundColor: '#151515'
    });
    const errorMessage =
      error instanceof Error
        ? escape(String(error))
        : 'ERROR: Source code processing error.';
    rootElement.innerHTML = `<pre>${errorMessage}</pre>`;
  }
};

export type { SetupSandboxSettings };
export { setupSandbox };
