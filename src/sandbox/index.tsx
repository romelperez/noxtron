import React, { ReactElement } from 'react';
import ReactDOM from 'react-dom';
import { transform } from '@babel/standalone';

import { convertLocationSearchToObject } from '../utils/convertLocationSearchToObject';

const parameters = convertLocationSearchToObject(window.location.search);
const root = document.querySelector('#root') as HTMLDivElement;
const render = (element: ReactElement): void => {
  ReactDOM.render(element, root);
};

try {
  const codeRaw = window.atob(window.decodeURI(parameters.code || ''));

  if (!codeRaw) {
    throw new Error('No source code provided.')
  }

  const transformation = transform(codeRaw, {
    filename: 'sandbox.tsx',
    presets: ['env', 'react', 'typescript']
  });

  const codeTransformed = transformation.code || '';

  if (codeTransformed) {
    const fn = new Function('React', 'render', `(function () { ${codeTransformed} })();`);
    fn(React, render);
  }
  else {
    throw new Error('Invalid source code provided.')
  }
} catch (error: unknown) {
  Object.assign(document.body.style, {
    margin: '20px',
    fontFamily: 'monospace',
    fontSize: '21px',
    color: '#f22',
    backgroundColor: '#171717'
  });
  root.innerHTML = error instanceof Error ? String(error) : 'Source code processing error.';
}
