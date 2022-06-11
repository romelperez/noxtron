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
export type NTThemeSettingsColorValue = [number, number, number, number?];
export type NTThemeSettingsColorPatch = Array<number | undefined | null>;
export type NTThemeSettingsColor = (
  index: number,
  patch?: NTThemeSettingsColorPatch
) => NTThemeSettingsColorValue;

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

export type NTRouterOptionsControls = {
  type: 'predefined' | 'custom';
  sandbox: string[];
  code: string;
};

export type NTRouterOptionsBooleans = Record<NTRouterURLOptionBoolean, boolean>;

export type NTRouterOptions = Record<NTRouterURLOption, string | undefined>;

export type NTRouterOptionsUpdate = Partial<NTRouterOptionsControls> &
  Partial<NTRouterOptionsBooleans>;

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

// TYPE DEFINITION

export interface NTTypeDefinition {
  filename: string;
  code: string;
}

// TRANSPILATION

export interface NTTranspilation {
  importsLines: string[];
  code: string;
  error: string;
}

// SETUP

export type NTSetupTheme = Partial<{
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
  colorSchemeDefault: NTThemeColorScheme;
  colorSchemeDisabled: boolean;
}>;

export interface NTSetupUI {
  /**
   * For small width viewport.
   */
  small?: ReactNode;
  /**
   * For medium width viewport.
   */
  medium?: ReactNode;
}

export interface NTSetup {
  /**
   * Root HTML element to render playground app.
   */
  element: HTMLElement;
  /**
   * The URL path to the playground app.
   * @default '/''
   * @example '/docs/' to serve Noxtron at "website.com/docs/".
   */
  basePath: string;
  /**
   * The URL path to the Noxtron asset files.
   * @default '/'
   */
  assetsPath: string;
  /**
   * The playground app HTML URL.
   * @example '/playground.html'
   */
  playgroundPath: string;
  /**
   * The sandbox app HTML URL.
   * * @example '/sandbox.html'
   */
  sandboxPath: string;
  /**
   * Sandboxes source code language.
   */
  codeLanguage: 'javascript' | 'typescript';
  /**
   * JavaScript/TypeScript source code to show when a new custom empty sandbox
   * is created.
   */
  newCustomSandboxCode: string;
  /**
   * Text message to show when a new custom empty sandbox is created.
   */
  newCustomSandboxMessage: string;
  /**
   * Visual theme customization.
   */
  theme: NTSetupTheme;
  /**
   * Playground app title.
   */
  title: NTSetupUI;
  /**
   * Playground app header custom elements.
   */
  header: NTSetupUI;
  /**
   * Playground app toolbar custom elements.
   */
  toolbar: NTSetupUI;
  /**
   * Playground app links custom elements.
   */
  links: {
    small?: ReactNode[][];
    medium?: ReactNode[][];
  };
  /**
   * Get the sandboxes list. Since this list contains every sandbox source code,
   * it may get big in filesize. It should be lazy loaded if possible.
   */
  getSandboxes: () => Promise<NTSandbox[]> | NTSandbox[];
  /**
   * Get the type definitions contents for both JavaScript and TypeScript sandboxes.
   * TypeScript sandboxes will show errors in the editor. JavaScript sandboxes will not.
   * Since these type definitions contents may take a big filesize, the list
   * should be lazy loaded.
   */
  getTypeDefinitions?: () => Promise<NTTypeDefinition[]> | NTTypeDefinition[];
  /**
   * When the playground app URL changes.
   */
  onRouteChange?: () => void;
  /**
   * When the current sandbox changes.
   */
  onSandboxChange?: (sandbox: NTSandbox | null) => void;
}

// STORES

export type NTStoreSetup = NTSetup;

export interface NTStoreRouter {
  options: NTRouterOptions;
  optionsControls: NTRouterOptionsControls;
  optionsBooleans: NTRouterOptionsBooleans;
}

export interface NTStoreDependencies {
  isLoading: boolean;
  error: string;
  monaco: NTMonaco;
  model: NTMonacoModel;
  sandboxes: NTSandbox[];
  typeDefinitions: NTTypeDefinition[];
}

export type NTStoreSandboxSelected = NTSandbox | null;

export interface NTStoreTranspilation extends NTTranspilation {
  isLoading: boolean;
  sandboxURLParams: string;
}

// APP PLAYGROUND SETTINGS

export type NTAppPlaygroundSettings = Partial<NTSetup>;

// APP SANBOX SETTINGS

export interface NTAppSandboxSettingsDependency {
  name: string;
  pkg: unknown;
}

export interface NTAppSandboxSettings {
  dependencies?: NTAppSandboxSettingsDependency[];
}
