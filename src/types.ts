import type { ReactNode, CSSProperties } from 'react';
import type { CSSObject } from '@emotion/react';

// THEME

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
}

// BREAKPOINTS

export interface NTBreakpoints {
  medium: {
    down: string;
    up: string;
  };
  large: {
    down: string;
    up: string;
  };
}

// STYLES

export type NTStyle = CSSObject;
export type NTStyles = Record<string, NTStyle>;

// ROUTER

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
  sandbox?: string[];
  code?: string;
} & { [name in NTRouterURLOptionBoolean]?: boolean };

export type NTRouterStateOptions = Record<
  NTRouterURLOption,
  string | undefined
>;

export interface NTRouterState {
  options: NTRouterStateOptions;
  optionsControls: {
    type: 'predefined' | 'custom';
    sandbox: string[];
    code: string;
  };
  optionsBooleans: Record<NTRouterURLOptionBoolean, boolean>;
  setOptions: (newOptions: NTRouterStateSetOptionsUpdate) => void;
}

// SANDBOX

export interface NTSandbox {
  name: string;
  code?: string;
  children?: NTSandbox[];
}

export interface NTSandboxDependency {
  name: string;
  pkg: unknown;
  slug: string;
}

export interface NTSandboxImportRef {
  values: string;
  dependencyName: string;
  dependencySlug: string;
}

// STORE

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
  setSandboxCode: (code: string) => void;
  subscribe: (event: NTStoreEvent, subscriber: NTStoreSubscriber) => void;
  unsubscribe: (event: NTStoreEvent, subscriber: NTStoreSubscriber) => void;
  trigger: (event: NTStoreEvent) => void;
}

// PLAYGROUND SETTINGS

export type NTPlaygroundSettingsTheme = Partial<{
  typographyCommons: {
    heading: CSSProperties;
    body: CSSProperties;
    cta: CSSProperties;
    code: CSSProperties;
  };
  colorHues: Partial<{
    primary: number;
    secondary: number;
  }>;
}>;

export interface NTPlaygroundSettingsTypeDefinition {
  filename: string;
  code: string;
}

export interface NTPlaygroundSettings {
  basePath: string;
  playgroundPath: string;
  sandboxPath: string;
  codeLanguage: 'javascript' | 'typescript';
  typeDefinitions: NTPlaygroundSettingsTypeDefinition[];
  sandboxes: NTSandbox[];
  theme?: NTPlaygroundSettingsTheme;
  title?: {
    mobile?: ReactNode;
    desktop?: ReactNode;
  };
  links?: {
    mobile?: ReactNode[];
    desktop?: ReactNode[][];
  };
}

// SANBOX SETTINGS

export interface NTSandboxSettingsDependency {
  name: string;
  pkg: unknown;
}

export interface NTSandboxSettings {
  dependencies?: NTSandboxSettingsDependency[];
}
