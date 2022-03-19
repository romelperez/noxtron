import type { CSSProperties } from 'react';

export type ThemeSettingsMultiplier = number;
export type ThemeSettingsStyle = CSSProperties[];
export type ThemeSettingsColor = (
  index: number
) => [number, number, number, number?];

export type ThemeMultiplier = (index: number) => number;
export type ThemeStyleValue = CSSProperties;
export type ThemeStyle = (index: number) => ThemeStyleValue;
export type ThemeColor = (index: number) => string;

export interface Theme {
  space: ThemeMultiplier;
  typography: {
    heading: ThemeStyle;
    body: ThemeStyle;
    cta: ThemeStyle;
  };
  colors: {
    primary: {
      text: ThemeColor;
      textHigh: ThemeColor;
      deco: ThemeColor;
      decoHigh: ThemeColor;
      level: ThemeColor;
      levelHigh: ThemeColor;
      bg: ThemeColor;
      overlay: ThemeColor;
    };
    secondary: {
      text: ThemeColor;
      textHigh: ThemeColor;
      deco: ThemeColor;
      decoHigh: ThemeColor;
      level: ThemeColor;
      levelHigh: ThemeColor;
      bg: ThemeColor;
      overlay: ThemeColor;
    };
  };
  breakpoints: {
    medium: {
      up: string;
      down: string;
    };
    large: {
      up: string;
      down: string;
    };
  };
}
