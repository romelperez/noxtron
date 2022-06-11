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
        fontFamily: '"Chakra Petch", sans-serif',
        fontWeight: '600',
        textTransform: 'uppercase'
      },
      body: {
        fontFamily: '"Chakra Petch", sans-serif',
        fontWeight: '400'
      },
      cta: {
        fontFamily: '"Chakra Petch", sans-serif',
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
      primary: 120,
      secondary: 60
    }
  },
  getSandboxes: () =>
    Promise.resolve([
      {
        name: 'MyComponent',
        children: [
          {
            name: 'basic',
            code: `const root = document.querySelector('#root');
root.style.color = '#77f';
root.innerHTML = '<h1>MyComponent basic sandbox!</h1>';
`
          },
          {
            name: 'advanced',
            code: `const root = document.querySelector('#root');
root.style.color = '#f77';
root.innerHTML = '<h1>MyComponent advanced sandbox!</h1>';
`
          }
        ]
      }
    ])
}));
