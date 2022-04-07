import mapValues from 'lodash/mapValues';

import type {
  NTThemeColorScheme,
  NTTheme,
  NTPlaygroundSettingsTheme
} from '../../../types';
import { createThemeMultiplier } from './createThemeMultiplier';
import { createThemeStyle } from './createThemeStyle';
import { createThemeColorPalette } from './createThemeColorPalette';

const createTheme = (
  colorScheme: NTThemeColorScheme,
  userSettings: NTPlaygroundSettingsTheme = {}
): NTTheme => {
  const commonTypo = { fontFamily: 'Menlo, Monaco, "Courier New", monospace' };
  const userTypo = { ...userSettings.typographyCommons };
  const typography = mapValues(
    {
      heading: [
        { ...commonTypo, ...userTypo.heading, fontSize: '24px' },
        { ...commonTypo, ...userTypo.heading, fontSize: '21px' },
        { ...commonTypo, ...userTypo.heading, fontSize: '18px' },
        { ...commonTypo, ...userTypo.heading, fontSize: '16px' },
        { ...commonTypo, ...userTypo.heading, fontSize: '14px' }
      ],
      body: [
        { ...commonTypo, ...userTypo.body, fontSize: '18px' },
        { ...commonTypo, ...userTypo.body, fontSize: '16px' },
        { ...commonTypo, ...userTypo.body, fontSize: '14px' },
        { ...commonTypo, ...userTypo.body, fontSize: '12px' },
        { ...commonTypo, ...userTypo.body, fontSize: '10px' }
      ],
      cta: [
        { ...commonTypo, ...userTypo.cta, fontSize: '18px' },
        { ...commonTypo, ...userTypo.cta, fontSize: '16px' },
        { ...commonTypo, ...userTypo.cta, fontSize: '14px' },
        { ...commonTypo, ...userTypo.cta, fontSize: '12px' },
        { ...commonTypo, ...userTypo.cta, fontSize: '10px' }
      ],
      code: [
        { ...commonTypo, ...userTypo.code, fontSize: '18px' },
        { ...commonTypo, ...userTypo.code, fontSize: '16px' },
        { ...commonTypo, ...userTypo.code, fontSize: '14px' },
        { ...commonTypo, ...userTypo.code, fontSize: '12px' },
        { ...commonTypo, ...userTypo.code, fontSize: '10px' }
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
    space: createThemeMultiplier(4)
  };
};

export { createTheme };
