import React from 'react';
import { render } from 'react-dom';

import type { NTPlaygroundSettings } from '../../../../';
import { Playground } from '../../../../build/playground';

const settings: NTPlaygroundSettings = {
  basePath: '/noxtron/',
  playgroundPath: '/noxtron',
  sandboxPath: '/noxtron/sandbox.html',
  codeLanguage: 'typescript',
  typeDefinitions: [
    // react and react-dom
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

    // @emotion/react
    {
      filename: 'file:///node_modules/@emotion/react/index.d.ts',
      code: require('!raw-loader?esModule=false!@emotion/react/types/index.d.ts')
    },
    {
      filename: 'file:///node_modules/@emotion/react/jsx-namespace.d.ts',
      code: require('!raw-loader?esModule=false!@emotion/react/types/jsx-namespace.d.ts')
    },
    {
      filename: 'file:///node_modules/@emotion/react/theming.d.ts',
      code: require('!raw-loader?esModule=false!@emotion/react/types/theming.d.ts')
    },
    {
      filename: 'file:///node_modules/@emotion/react/helper.d.ts',
      code: require('!raw-loader?esModule=false!@emotion/react/types/helper.d.ts')
    },
    {
      filename: 'file:///node_modules/@emotion/serialize/index.d.ts',
      code: require('!raw-loader?esModule=false!@emotion/serialize/types/index.d.ts')
    },
    {
      filename: 'file:///node_modules/@emotion/utils/index.d.ts',
      code: require('!raw-loader?esModule=false!@emotion/utils/types/index.d.ts')
    },

    // empanada (Mock)
    {
      filename: 'file:///node_modules/empanada/index.d.ts',
      code: require('!raw-loader?esModule=false!./types/empanada.txt')
    },

    // lodash (Mock)
    {
      filename: 'file:///node_modules/lodash/index.d.ts',
      code: require('!raw-loader?esModule=false!./types/lodash.txt')
    },

    // motion (Mock)
    {
      filename: 'file:///node_modules/motion/index.d.ts',
      code: require('!raw-loader?esModule=false!./types/motion.txt')
    }
  ],
  sandboxes: [
    {
      name: 'MyComponent',
      children: [
        {
          name: 'basic',
          code: require('!raw-loader?esModule=false!./sandboxes/basic.txt')
        },
        {
          name: 'intermediate',
          code: require('!raw-loader?esModule=false!./sandboxes/intermediate.txt')
        },
        {
          name: 'complex',
          code: require('!raw-loader?esModule=false!./sandboxes/complex.txt')
        }
      ]
    }
  ],
  title: {
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
  }
};

render(<Playground settings={settings} />, document.querySelector('#root'));
