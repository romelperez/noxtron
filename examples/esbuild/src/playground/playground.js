import React from 'react';
import { render } from 'react-dom';

import { Playground } from '../../../../build/cjs/playground';

const getSettings = () => ({
  basePath: '/noxtron/',
  assetsPath: '/noxtron/',
  playgroundPath: '/noxtron/',
  sandboxPath: '/noxtron/sandbox/',
  codeLanguage: 'javascript',
  title: {
    small: 'NT',
    medium: 'Noxtron'
  },
  theme: {
    typographyCommons: {
      heading: {
        fontFamily: 'Jura, sans-serif',
        fontWeight: '700',
        textTransform: 'uppercase'
      },
      body: {
        fontFamily: 'Jura, sans-serif',
        fontWeight: '400'
      },
      cta: {
        fontFamily: 'Jura, sans-serif',
        fontWeight: '400',
        textTransform: 'uppercase'
      },
      code: {
        fontFamily:
          '"Source Code Pro", Menlo, Monaco, "Courier New", monospace',
        fontWeight: '400'
      }
    },
    colorHues: {
      primary: 190, // Cyan
      secondary: 70 // Yellow
    }
  },
  getMonaco: () => import('../../../../build/cjs/monaco'),
  getSandboxes: () =>
    Promise.resolve([
      {
        name: 'MyComponent',
        children: [
          {
            name: 'basic',
            code: `const root = document.querySelector('#root');
root.style.color = '#777';
root.innerHTML = '<h1>MyComponent basic sandbox!</h1>';
`
          },
          {
            name: 'advanced',
            code: `const root = document.querySelector('#root');
root.style.color = '#777';
root.innerHTML = '<h1>MyComponent advanced sandbox!</h1>';
`
          }
        ]
      }
    ])
});

render(
  React.createElement(Playground, { getSettings }),
  document.querySelector('#root')
);
