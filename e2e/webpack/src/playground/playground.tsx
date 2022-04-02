import React from 'react';
import { render } from 'react-dom';

import type { NTPlaygroundSettings } from '../../../../';
import { Playground } from '../../../..//build/playground';

const settings: NTPlaygroundSettings = {
  basePath: '/play',
  playgroundPath: '/play',
  sandboxPath: '/play/sandbox.html',
  codeLanguage: 'typescript',
  typeDefinitions: [
    {
      filename: 'file:///node_modules/csstype/index.d.ts',
      code: require('!raw-loader?esModule=false!csstype/index.d.ts')
    },
    {
      filename: 'file:///node_modules/@types/prop-types/index.d.ts',
      code: require('!raw-loader?esModule=false!@types/prop-types/index.d.ts')
    },
    {
      filename: 'file:///node_modules/@types/react/index.d.ts',
      code: require('!raw-loader?esModule=false!@types/react/index.d.ts')
    },
    {
      filename: 'file:///node_modules/@types/react/global.d.ts',
      code: require('!raw-loader?esModule=false!@types/react/global.d.ts')
    },
    {
      filename: 'file:///node_modules/@types/scheduler/tracing.d.ts',
      code: require('!raw-loader?esModule=false!@types/scheduler/tracing.d.ts')
    },
    {
      filename: 'file:///node_modules/@types/react-dom/index.d.ts',
      code: require('!raw-loader?esModule=false!@types/react-dom/index.d.ts')
    },
    {
      filename: 'file:///node_modules/empanada/index.d.ts',
      code: require('!raw-loader?esModule=false!./types/empanada.txt')
    }
  ],
  sandboxes: [
    {
      name: '@org/project',
      children: [
        {
          name: 'basic',
          code: require('!raw-loader?esModule=false!./sandboxes/basic.txt')
        },
        {
          name: 'complex',
          code: require('!raw-loader?esModule=false!./sandboxes/complex.txt')
        }
      ]
    }
  ],
  title: {
    mobile: <h1>Noxtron</h1>,
    desktop: <h1>Noxtron E2E</h1>
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

render(<Playground {...settings} />, document.querySelector('#root'));
