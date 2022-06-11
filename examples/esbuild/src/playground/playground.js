window.noxtron.setupPlayground(() => ({
  element: document.querySelector('#root'),
  basePath: '/noxtron/',
  assetsPath: '/noxtron/umd/',
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
        fontFamily: 'Roboto, sans-serif',
        fontWeight: '700',
        textTransform: 'uppercase'
      },
      body: {
        fontFamily: 'Roboto, sans-serif',
        fontWeight: '400'
      },
      cta: {
        fontFamily: 'Roboto, sans-serif',
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
      primary: 200,
      secondary: 30
    }
  },
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
    <div style={{ padding: '20px', background: 'black', color: 'magenta' }}>
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
}));
