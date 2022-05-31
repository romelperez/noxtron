import type { NTThemePalette } from '../../../types';
import { createThemeColor } from './createThemeColor';

const createThemeColorPalette = (hue: number): NTThemePalette => {
  return {
    text: createThemeColor((i) => [hue, 50, i * 5, 1]),
    textHigh: createThemeColor((i) => [hue, 90, i * 5, 1]),
    deco: createThemeColor((i) => [hue, 30, i * 5, 1]),
    decoHigh: createThemeColor((i) => [hue, 70, i * 5, 1]),
    level: createThemeColor((i) => [hue, 30, 75, 0.04 * i]),
    levelHigh: createThemeColor((i) => [hue, 80, 75, 0.04 * i]),
    bg: createThemeColor((i) => [hue, 5, i * 2, 1])
  };
};

export { createThemeColorPalette };
