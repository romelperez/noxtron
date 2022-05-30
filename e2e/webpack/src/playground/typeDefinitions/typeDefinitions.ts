import type { NTPlaygroundSettingsTypeDefinition } from '../../../../../build';

export const typeDefinitions: NTPlaygroundSettingsTypeDefinition[] = [
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
    code: require('!raw-loader?esModule=false!./empanada.txt')
  },

  // lodash (Mock)
  {
    filename: 'file:///node_modules/lodash/index.d.ts',
    code: require('!raw-loader?esModule=false!./lodash.txt')
  },

  // motion (Mock)
  {
    filename: 'file:///node_modules/motion/index.d.ts',
    code: require('!raw-loader?esModule=false!./motion.txt')
  }
];
