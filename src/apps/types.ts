import type { CSSProperties } from 'react';
import type { CSSObject } from '@emotion/react';

export type ThemeSettingsMultiplier = number;
export type ThemeSettingsStyle = CSSProperties[];
export type ThemeSettingsColor = (
  index: number
) => [number, number, number, number?];

export type ThemeMultiplier = (index: number) => number;
export type ThemeStyleValue = CSSProperties;
export type ThemeStyle = (index: number) => ThemeStyleValue;
export type ThemeColor = (index: number) => string;
export type ThemeColorScheme = 'dark' | 'light';
export interface ThemePalette {
  text: ThemeColor;
  textHigh: ThemeColor;
  deco: ThemeColor;
  decoHigh: ThemeColor;
  level: ThemeColor;
  levelHigh: ThemeColor;
  bg: ThemeColor;
  overlay: ThemeColor;
}

export interface Theme {
  space: ThemeMultiplier;
  typography: {
    heading: ThemeStyle;
    body: ThemeStyle;
    cta: ThemeStyle;
    code: ThemeStyle;
  };
  colorScheme: ThemeColorScheme;
  colors: {
    primary: ThemePalette;
    secondary: ThemePalette;
  };
  breakpoints: {
    medium: {
      down: string;
      up: string;
    };
    large: {
      down: string;
      up: string;
    };
  };
}

export type Style = CSSObject;
export type Styles = Record<string, Style>;

export type RouterURLOptionControl = 'type' | 'sandbox' | 'code';
export type RouterURLOptionBoolean = 'explorer' | 'editor' | 'preview' | 'dark';
export type RouterURLOption = RouterURLOptionControl | RouterURLOptionBoolean;
export type RouterStateSetOptionsUpdate =
  & { type?: 'predefined' | 'custom' }
  & { sandbox?: string[] }
  & { code?: string }
  & { [name in RouterURLOptionBoolean]?: boolean }
export interface RouterState {
  options: Record<RouterURLOption, string | undefined>
  optionsControls: {
    type: 'predefined' | 'custom'
    sandbox: string[]
    code: string
  }
  optionsBooleans: Record<RouterURLOptionBoolean, boolean>
  setOptions: (newOptions: RouterStateSetOptionsUpdate) => void
}

export interface Config {
  basePath: string
  playgroundPath: string
  sandboxPath: string
  title?: string
}

export interface StoreSandbox {
  name: string
  language?: string
  code?: string
  children?: StoreSandbox[]
}
export type StoreEvent =
  | 'reload'
  | 'resetPredefinedSandboxCode'
  | 'copyCode'
  | 'customSandbox'
  | 'openIsolated';
export type StoreSubscriber = () => void;
export interface Store {
  config: Config
  sandboxes: StoreSandbox[]
  sandboxSelected: StoreSandbox | null
  sandboxCode: string
  setSandboxCode: (code: string) => void
  subscribe: (event: StoreEvent, subscriber: StoreSubscriber) => void
  unsubscribe: (event: StoreEvent, subscriber: StoreSubscriber) => void
  trigger: (event: StoreEvent) => void
}
