window.noxtron.setupPlayground(({ React }) => ({
  element: document.querySelector('#root'),
  basePath: '/noxtron/',
  assetsPath: '/noxtron/umd/',
  playgroundPath: '/noxtron/',
  sandboxPath: '/noxtron/sandbox/',
  codeLanguage: 'typescript',
  title: {
    small: 'NT',
    medium: 'Noxtron'
  },
  links: {
    small: [
      [
        React.createElement('span', null, 'v1.2.3 00-12-31'),
        React.createElement('a', {
          href: 'https://github.com/romelperez/noxtron',
          target: 'Website'
        })
      ]
    ],
    medium: [
      [
        React.createElement('span', null, 'v1.2.3 00-12-31'),
        React.createElement(
          'a',
          {
            href: 'https://github.com/romelperez/noxtron',
            target: 'Website'
          },
          'Website'
        )
      ],
      [
        React.createElement(
          'a',
          {
            href: 'https://twitter.com/romelperez07',
            target: 'Twitter'
          },
          'Twitter'
        ),
        React.createElement(
          'a',
          {
            href: 'https://github.com/romelperez/noxtron',
            target: 'GitHub'
          },
          'GitHub'
        )
      ]
    ]
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
  getSandboxes: () => import('./sandboxes/sandboxes').then((m) => m.sandboxes),
  getTypeDefinitions: () =>
    import('./typeDefinitions/typeDefinitions').then((m) => m.typeDefinitions)
}));
