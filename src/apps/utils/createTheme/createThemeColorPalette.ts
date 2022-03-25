import type { NTThemePalette, NTThemeColorScheme } from '../../types';
import { createThemeColor } from './createThemeColor';

const createThemeColorPalette = (
  hue: number,
  colorScheme: NTThemeColorScheme
): NTThemePalette => {
  if (colorScheme === 'dark') {
    return {
      text: createThemeColor((i) => [hue, 50, i * 5, 1]),
      textHigh: createThemeColor((i) => [hue, 90, i * 5, 1]),
      deco: createThemeColor((i) => [hue, 30, i * 5, 1]),
      decoHigh: createThemeColor((i) => [hue, 70, i * 5, 1]),
      level: createThemeColor((i) => [hue, 30, 75, 0.04 * i]),
      levelHigh: createThemeColor((i) => [hue, 80, 75, 0.04 * i]),
      bg: createThemeColor((i) => [hue, 5, i * 2, 1]),
      overlay: createThemeColor((i) => [hue, 10, i * 5, 0.65])
    };
  }
  return {
    text: createThemeColor((i) => [hue, 50, 100 - i * 5, 1]),
    textHigh: createThemeColor((i) => [hue, 90, 100 - i * 5, 1]),
    deco: createThemeColor((i) => [hue, 30, 100 - i * 5, 1]),
    decoHigh: createThemeColor((i) => [hue, 70, 100 - i * 5, 1]),
    level: createThemeColor((i) => [hue, 30, 75, 0.1 * i]),
    levelHigh: createThemeColor((i) => [hue, 80, 75, 0.1 * i]),
    bg: createThemeColor((i) => [hue, 5, 100 - i * 2, 1]),
    overlay: createThemeColor((i) => [hue, 10, 100 - i * 5, 0.65])
  };
};

export { createThemeColorPalette };
