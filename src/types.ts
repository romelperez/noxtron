import type { ReactNode, CSSProperties } from 'react';
import type { CSSObject } from '@emotion/react';

// This import MUST be from the API file (not the root) to prevent Monaco from
// being pulled into the main bundle.
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

// MONACO

export type NTMonaco = typeof monaco;
export type NTMonacoLanguage = typeof monaco.languages.typescript;
export type NTMonacoUri = monaco.Uri;
export type NTMonacoEditor = monaco.editor.IStandaloneCodeEditor;
export type NTMonacoModel = monaco.editor.ITextModel;
export type NTMonacoCompilerOptions =
  monaco.languages.typescript.CompilerOptions;

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
  xlarge: {
    down: string;
    up: string;
  };
  xxlarge: {
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

// PLAYGROUND SETTINGS

export type NTPlaygroundSettingsTheme = Partial<{
  typographyCommons: Partial<{
    heading: CSSProperties;
    body: CSSProperties;
    cta: CSSProperties;
    code: CSSProperties;
  }>;
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
  codeLanguage?: 'javascript' | 'typescript';
  editorCustomSandboxMsg?: string;
  theme?: NTPlaygroundSettingsTheme;
  title?: {
    mobile?: ReactNode;
    desktop?: ReactNode;
  };
  links?: {
    mobile?: ReactNode[][];
    desktop?: ReactNode[][];
  };
  getMonaco: () => Promise<NTMonaco>;
  getSandboxes: () => Promise<NTSandbox[]>;
  getTypeDefinitions?: () => Promise<NTPlaygroundSettingsTypeDefinition[]>;
  onRouteChange?: () => void;
  onSandboxChange?: (sandbox: NTSandbox | null) => void;
}

// SANBOX SETTINGS

export interface NTSandboxSettingsDependency {
  name: string;
  pkg: unknown;
}

export interface NTSandboxSettings {
  dependencies?: NTSandboxSettingsDependency[];
}

// STORE

export interface NTStoreTranspilation {
  isLoading: boolean;
  importsLines: string[];
  code: string;
  error: string;
}

export type NTStoreEvent =
  | 'reload'
  | 'resetPredefinedSandboxCode'
  | 'copyCode'
  | 'customSandbox'
  | 'openIsolated';

export type NTStoreSubscriber = () => void;

export interface NTStore {
  isLoading: boolean;
  error: string;
  monaco: NTMonaco;
  model: NTMonacoModel;
  typeDefinitions: NTPlaygroundSettingsTypeDefinition[];
  sandboxes: NTSandbox[];
  sandboxSelected: NTSandbox | null;
  transpilation: NTStoreTranspilation;

  setStatus: (status: Partial<{ isLoading: boolean; error: string }>) => void;
  setDependencies: (dependencies: {
    monaco: NTMonaco;
    model: NTMonacoModel;
    sandboxes: NTSandbox[];
    typeDefinitions: NTPlaygroundSettingsTypeDefinition[];
  }) => void;
  setSandboxSelected: (sandbox: NTSandbox | null) => void;
  updateTranspilation: (transpilation: Partial<NTStoreTranspilation>) => void;

  subscribe: (event: NTStoreEvent, subscriber: NTStoreSubscriber) => void;
  unsubscribe: (event: NTStoreEvent, subscriber: NTStoreSubscriber) => void;
  trigger: (event: NTStoreEvent) => void;
}
