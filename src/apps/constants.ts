import type {
  RouterURLOptionControl,
  RouterURLOptionBoolean,
  RouterURLOption
} from './types';

export const ROUTER_URL_OPTIONS_CONTROLS: RouterURLOptionControl[] = [
  'type',
  'sandbox',
  'code'
];
export const ROUTER_URL_OPTIONS_BOOLEANS: RouterURLOptionBoolean[] = [
  'explorer',
  'editor',
  'preview',
  'dark'
];

export const ROUTER_URL_OPTIONS: RouterURLOption[] = [
  ...ROUTER_URL_OPTIONS_CONTROLS,
  ...ROUTER_URL_OPTIONS_BOOLEANS
];
