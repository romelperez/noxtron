import mapValues from 'lodash/mapValues';

import type {
  NTThemeColorScheme,
  NTTheme,
  NTUserConfigTheme
} from '../../../types';
import { createThemeMultiplier } from './createThemeMultiplier';
import { createThemeStyle } from './createThemeStyle';
import { createThemeColorPalette } from './createThemeColorPalette';

const createTheme = (
  colorScheme: NTThemeColorScheme,
  userSettings: NTUserConfigTheme = {}
): NTTheme => {
  const userTypo = { ...userSettings.typographyCommons };
  const typography = mapValues(
    {
      heading: [
        { ...userTypo.heading, fontSize: '24px' },
        { ...userTypo.heading, fontSize: '21px' }
      ],
      body: [
        { ...userTypo.body, fontSize: '18px' },
        { ...userTypo.body, fontSize: '16px' }
      ],
      cta: [
        { ...userTypo.cta, fontSize: '16px' },
        { ...userTypo.cta, fontSize: '14px' }
      ],
      code: [
        { ...userTypo.code, fontSize: '16px' },
        { ...userTypo.code, fontSize: '14px' }
      ]
    },
    (styles) => createThemeStyle(styles || [])
  );

  const colorHues = { ...userSettings.colorHues };
  const colors = {
    primary: createThemeColorPalette(colorHues.primary ?? 180, colorScheme),
    secondary: createThemeColorPalette(colorHues.secondary ?? 60, colorScheme)
  };

  return {
    typography,
    colors,
    colorScheme,
    space: createThemeMultiplier(4),
    breakpoints: {
      medium: {
        down: '@media (max-width: 767px)',
        up: '@media (min-width: 768px)'
      },
      large: {
        down: '@media (max-width: 1023px)',
        up: '@media (min-width: 1024px)'
      }
    }
  };
};

export { createTheme };
