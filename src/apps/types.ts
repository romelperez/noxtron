import type { CSSProperties, HTMLProps } from 'react';
import type { CSSObject } from '@emotion/react';

export type NTThemeSettingsMultiplier = number;
export type NTThemeSettingsStyle = CSSProperties[];
export type NTThemeSettingsColor = (
  index: number
) => [number, number, number, number?];

export type NTThemeMultiplier = (index: number) => number;
export type NTThemeStyleValue = CSSProperties;
export type NTThemeStyle = (index: number) => NTThemeStyleValue;
export type NTThemeColor = (index: number) => string;
export type NTThemeColorScheme = 'dark' | 'light';
export interface NTThemePalette {
  text: NTThemeColor;
  textHigh: NTThemeColor;
  deco: NTThemeColor;
  decoHigh: NTThemeColor;
  level: NTThemeColor;
  levelHigh: NTThemeColor;
  bg: NTThemeColor;
  overlay: NTThemeColor;
}

export interface NTTheme {
  space: NTThemeMultiplier;
  typography: {
    heading: NTThemeStyle;
    body: NTThemeStyle;
    cta: NTThemeStyle;
    code: NTThemeStyle;
  };
  colorScheme: NTThemeColorScheme;
  colors: {
    primary: NTThemePalette;
    secondary: NTThemePalette;
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

export type NTStyle = CSSObject;
export type NTStyles = Record<string, NTStyle>;

export type NTRouterURLOptionControl = 'type' | 'sandbox' | 'code';
export type NTRouterURLOptionBoolean =
  | 'explorer'
  | 'editor'
  | 'preview'
  | 'dark';
export type NTRouterURLOption =
  | NTRouterURLOptionControl
  | NTRouterURLOptionBoolean;
export type NTRouterStateSetOptionsUpdate = {
  type?: 'predefined' | 'custom';
} & {
  sandbox?: string[];
} & { code?: string } & { [name in NTRouterURLOptionBoolean]?: boolean };

export interface NTRouterState {
  options: Record<NTRouterURLOption, string | undefined>;
  optionsControls: {
    type: 'predefined' | 'custom';
    sandbox: string[];
    code: string;
  };
  optionsBooleans: Record<NTRouterURLOptionBoolean, boolean>;
  setOptions: (newOptions: NTRouterStateSetOptionsUpdate) => void;
}

export interface NTConfig {
  basePath: string;
  playgroundPath: string;
  sandboxPath: string;
  title?: {
    mobile?: string;
    desktop?: string;
  };
  theme?: {
    typography?: {
      heading?: CSSProperties;
      body?: CSSProperties;
      cta?: CSSProperties;
      code?: CSSProperties;
    };
  };
  links?: {
    mobile?: Array<
      HTMLProps<HTMLElement> & { as: keyof HTMLElementTagNameMap }
    >;
    desktop?: Array<
      Array<HTMLProps<HTMLElement> & { as: keyof HTMLElementTagNameMap }>
    >;
  };
}

export interface NTSandbox {
  name: string;
  language?: string;
  code?: string;
  children?: NTSandbox[];
}

export type NTStoreEvent =
  | 'reload'
  | 'resetPredefinedSandboxCode'
  | 'copyCode'
  | 'customSandbox'
  | 'openIsolated';

export type NTStoreSubscriber = () => void;

export interface NTStore {
  sandboxSelected: NTSandbox | null;
  sandboxCode: string;
  sandboxError: string;
  setSandboxCode: (code: string) => void;
  setSandboxError: (error: string) => void;
  subscribe: (event: NTStoreEvent, subscriber: NTStoreSubscriber) => void;
  unsubscribe: (event: NTStoreEvent, subscriber: NTStoreSubscriber) => void;
  trigger: (event: NTStoreEvent) => void;
}
