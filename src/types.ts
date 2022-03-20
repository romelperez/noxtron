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

export type RouterURLType = 'p' | 'c'; // "p" for predefined. "c" for custom.
export type RouterURLRoute = string[];
export type RouterURLOptionsTexts = 'code';
export type RouterURLOptionsBooleans = 'explorer' | 'editor' | 'preview' | 'dark';
export type RouterURLOptions = RouterURLOptionsTexts | RouterURLOptionsBooleans;
export interface RouterState {
  isReady: boolean
  type: RouterURLType
  route: RouterURLRoute
  options: Record<RouterURLOptions, string | undefined>
  optionsBooleans: Record<RouterURLOptionsBooleans, boolean>
  setOptionValue: (option: RouterURLOptions, value: string) => void
}
