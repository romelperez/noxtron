import React from 'react';
import { render } from 'react-dom';

import type { NTPlaygroundSettings } from '../../../../';
import { Playground } from '../../../../build/playground';

const settings: NTPlaygroundSettings = {
  basePath: '/noxtron/',
  playgroundPath: '/noxtron',
  sandboxPath: '/noxtron/sandbox.html',
  codeLanguage: 'typescript',
  header: {
    mobile: 'Noxtron',
    desktop: 'Noxtron'
  },
  links: {
    mobile: [
      [
        <span>v1.2.3 00-12-31</span>,
        <a href="https://github.com/romelperez/noxtron" target="Website">
          Website
        </a>
      ]
    ],
    desktop: [
      [
        <span>v1.2.3 00-12-31</span>,
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
      primary: 190, // Cyan
      secondary: 70 // Yellow
    }
  },
  getMonaco: () => import('monaco-editor'),
  getSandboxes: () => import('./sandboxes/sandboxes').then((m) => m.sandboxes),
  getTypeDefinitions: () =>
    import('./typeDefinitions/typeDefinitions').then((m) => m.typeDefinitions)
};

render(<Playground settings={settings} />, document.querySelector('#root'));
