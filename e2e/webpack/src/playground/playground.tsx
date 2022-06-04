import React from 'react';
import { render } from 'react-dom';

import type { NTPlaygroundSettings } from '../../../../build/cjs';
import { Playground } from '../../../../build/cjs/playground';

const settings: NTPlaygroundSettings = {
  basePath: '/noxtron/',
  assetsPath: '/noxtron/',
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
        <span>v1.2.3 00-12-31</span>,
        <a href="https://github.com/romelperez/noxtron" target="Website">
          Website
        </a>
      ]
    ],
    medium: [
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
  getMonaco: () => import('../../../../build/cjs/monaco'),
  getSandboxes: () => import('./sandboxes/sandboxes').then((m) => m.sandboxes),
  getTypeDefinitions: () =>
    import('./typeDefinitions/typeDefinitions').then((m) => m.typeDefinitions)
};

render(<Playground settings={settings} />, document.querySelector('#root'));
