import React from 'react';
import { render } from 'react-dom';

import type { NTSandbox, NTUserConfig } from '../../../build/cjs/apps';
import { Playground } from '../../../build/cjs/apps/playground';

const formatMdCode = (md: string): string => md.replace(/```.*\r?\n/g, '');

const sandboxes: NTSandbox[] = [
  {
    name: '@package/one',
    children: [
      {
        name: 'basic',
        language: 'typescript',
        code: formatMdCode(require('./sandboxes/one/basic.md').default)
      },
      {
        name: 'complex',
        language: 'typescript',
        code: formatMdCode(require('./sandboxes/one/complex.md').default)
      }
    ]
  },
  {
    name: '@package/two',
    children: [
      {
        name: 'SomeComponent',
        children: [
          {
            name: 'basic',
            language: 'typescript',
            code: formatMdCode(
              require('./sandboxes/two/SomeComponent/basic.md').default
            )
          },
          {
            name: 'complex',
            language: 'typescript',
            code: formatMdCode(
              require('./sandboxes/two/SomeComponent/complex.md').default
            )
          }
        ]
      },
      {
        name: 'useSomeContext',
        children: [
          {
            name: 'basic',
            language: 'typescript',
            code: formatMdCode(
              require('./sandboxes/two/useSomeContext/basic.md').default
            )
          },
          {
            name: 'complex',
            language: 'typescript',
            code: formatMdCode(
              require('./sandboxes/two/useSomeContext/complex.md').default
            )
          }
        ]
      }
    ]
  }
];

const config: NTUserConfig = {
  sandboxes,
  basePath: '/play',
  playgroundPath: '/play',
  sandboxPath: '/play/sandbox.html',
  title: {
    mobile: 'Noxtron',
    desktop: 'Noxtron e2e'
  },
  links: {
    mobile: [<span>v1.2.3 22-12-31</span>],
    desktop: [
      [
        <span>v1.2.3 22-12-31</span>,
        <a href="https://github.com/romelperez/noxtron" target="Website">
          Website
        </a>
      ],
      [
        <a href="https://twitter.com/romelperez07" target="Twitter">
          Twitter
        </a>,
        <a href="https://github.com/romelperez/noxtron" target="GitHub">
          GitHub
        </a>
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
      primary: 190,
      secondary: 70
    }
  }
};

render(<Playground config={config} />, document.querySelector('#root'));
