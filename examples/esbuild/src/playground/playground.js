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
            code: `/** @jsx h */
import h from 'solid-js/h';
import { render } from 'solid-js/web';

const Sandbox = () => {
  return (
    <h2 style={{ padding: '20px', background: 'black', color: 'yellow' }}>
      MyComponent basic
    </h2>
  );
};

render(() => <Sandbox />, document.querySelector('#root'));
`
          },
          {
            name: 'advanced',
            code: `/** @jsx h */
import h from 'solid-js/h';
import { render } from 'solid-js/web';
import { createSignal } from 'solid-js';

const Sandbox = () => {
  const [count, setCount] = createSignal(0);
  const onIncrement = () => setCount(count() + 1);

  return (
    <div style={{ padding: '20px', background: 'black', color: 'yellow' }}>
      <h2>MyComponent advanced</h2>
      <p>Counter: {count}</p>
      <button onClick={onIncrement}>Add</button>
    </div>
  );
};

render(() => <Sandbox />, document.querySelector('#root'));
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
