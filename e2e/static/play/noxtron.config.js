window.getNoxtronConfig = () => ({
  basePath: '/play',
  playgroundPath: '/play',
  sandboxPath: '/play/sandbox.html',
  title: {
    mobile: 'Noxtron',
    desktop: 'Noxtron e2e'
  },
  theme: {
    typography: {
      heading: {
        fontFamily: 'Jura, sans-serif',
        fontWeight: '700'
      },
      body: {
        fontFamily: 'Jura, sans-serif',
        fontWeight: '400'
      },
      cta: {
        fontFamily: 'Jura, sans-serif',
        fontWeight: '400'
      },
      code: {
        fontFamily:
          '"Source Code Pro", Menlo, Monaco, "Courier New", monospace',
        fontWeight: '400'
      }
    }
  },
  links: {
    mobile: [{ children: 'v1.2.3 22-12-31' }],
    desktop: [
      [
        { children: 'v1.2.3 22-12-31' },
        {
          as: 'a',
          href: 'https://github.com/romelperez/noxtron',
          target: 'Documentation',
          children: 'Website'
        }
      ],
      [
        {
          as: 'a',
          href: 'https://twitter.com/romelperez07',
          target: 'Twitter',
          children: 'Twitter'
        },
        {
          as: 'a',
          href: 'https://github.com/romelperez/noxtron',
          target: 'GitHub',
          children: 'GitHub'
        }
      ]
    ]
  }
});
