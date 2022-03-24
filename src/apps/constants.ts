import type {
  NTRouterURLOptionControl,
  NTRouterURLOptionBoolean,
  NTRouterURLOption
} from './types';

export const ROUTER_URL_OPTIONS_CONTROLS: NTRouterURLOptionControl[] = [
  'type',
  'sandbox',
  'code'
];
export const ROUTER_URL_OPTIONS_BOOLEANS: NTRouterURLOptionBoolean[] = [
  'explorer',
  'editor',
  'preview',
  'dark'
];

export const ROUTER_URL_OPTIONS: NTRouterURLOption[] = [
  ...ROUTER_URL_OPTIONS_CONTROLS,
  ...ROUTER_URL_OPTIONS_BOOLEANS
];
