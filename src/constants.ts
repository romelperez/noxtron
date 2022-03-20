import type { RouterURLOptionsTexts, RouterURLOptionsBooleans, RouterURLOptions } from './types';

export const ROUTER_URL_OPTIONS_TEXTS: RouterURLOptionsTexts[] = ['code'];
export const ROUTER_URL_OPTIONS_BOOLEANS: RouterURLOptionsBooleans[] = ['explorer', 'editor', 'preview', 'dark'];
export const ROUTER_URL_OPTIONS: RouterURLOptions[] = [...ROUTER_URL_OPTIONS_TEXTS, ...ROUTER_URL_OPTIONS_BOOLEANS];
