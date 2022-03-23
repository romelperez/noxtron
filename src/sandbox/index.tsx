import React, { ReactElement } from 'react';
import ReactDOM from 'react-dom';
import escape from 'lodash/escape';
import * as empanada from 'empanada';

import { decodeSourceCode } from '@src/utils/decodeSourceCode';
import { convertLocationSearchToObject } from '@src/utils/convertLocationSearchToObject';

const root = document.querySelector('#root') as HTMLDivElement;

try {
  const parameters = convertLocationSearchToObject(window.location.search);
  const codeRaw = decodeSourceCode(parameters.code);

  if (!codeRaw) {
    throw new Error('No source code provided.');
  }

  const codeWrap = `(function () { ${codeRaw}; })();`;
  const fn = new Function('React', 'render', 'empanada', codeWrap);

  const render = (element: ReactElement): void => {
    ReactDOM.render(element, root);
  };

  fn(React, render, empanada);
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
