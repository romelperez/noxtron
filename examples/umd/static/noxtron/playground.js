const getSettings = () => ({
  basePath: '/noxtron/',
  assetsPath: '/umd/',
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

const element = document.querySelector('#root');

window.noxtronPlayground.renderPlayground(getSettings, element);
