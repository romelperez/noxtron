import React, { ReactElement } from 'react';
import ReactDOM from 'react-dom';
import { transform } from '@babel/standalone';
import escape from 'lodash/escape';
import * as empanada from 'empanada';

import { convertLocationSearchToObject } from '../utils/convertLocationSearchToObject';

const root = document.querySelector('#root') as HTMLDivElement;

try {
  const parameters = convertLocationSearchToObject(window.location.search);
  const codeRaw = window.atob(window.decodeURI(parameters.code || ''));

  if (!codeRaw) {
    throw new Error('No source code provided.');
  }

  const transformation = transform(codeRaw, {
    filename: 'sandbox.tsx',
    presets: ['env', 'react', 'typescript']
  });

  if (transformation.code) {
    const code = `(function () { ${transformation.code}; })();`;
    const fn = new Function('React', 'render', 'empanada', code);

    const render = (element: ReactElement): void => {
      ReactDOM.render(element, root);
    };

    fn(React, render, empanada);
  } else {
    throw new Error('Invalid source code provided.');
  }
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
  root.innerHTML = `<pre>${errorMessage}</pre>`;
}
