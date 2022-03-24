import type {
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
