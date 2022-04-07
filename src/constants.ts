import type {
  NTBreakpoints,
  NTRouterURLOptionControl,
  NTRouterURLOptionBoolean,
  NTRouterURLOption
} from './types';

export const NT_ROUTER_URL_OPTIONS_CONTROLS: NTRouterURLOptionControl[] = [
  'type',
  'sandbox',
  'code'
];
export const NT_ROUTER_URL_OPTIONS_BOOLEANS: NTRouterURLOptionBoolean[] = [
  'explorer',
  'editor',
  'preview',
  'dark'
];

export const NT_ROUTER_URL_OPTIONS: NTRouterURLOption[] = [
  ...NT_ROUTER_URL_OPTIONS_CONTROLS,
  ...NT_ROUTER_URL_OPTIONS_BOOLEANS
];

export const NT_BREAKPOINTS: NTBreakpoints = {
  medium: {
    down: '@media (max-width: 767px)',
    up: '@media (min-width: 768px)'
  },
  large: {
    down: '@media (max-width: 1023px)',
    up: '@media (min-width: 1024px)'
  },
  xlarge: {
    down: '@media (max-width: 1443px)',
    up: '@media (min-width: 1444px)'
  },
  xxlarge: {
    down: '@media (max-width: 1919px)',
    up: '@media (min-width: 1920px)'
  }
};
