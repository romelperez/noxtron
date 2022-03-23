import type {
  ThemeSettingsMultiplier,
  ThemeSettingsStyle,
  ThemeSettingsColor,
  ThemeMultiplier,
  ThemeStyle,
  ThemeStyleValue,
  ThemeColor,
  ThemePalette,
  ThemeColorScheme,
  Theme
} from '../../types';

// TODO: Polish light theme color scheme.

const createThemeMultiplier = (
  settings: ThemeSettingsMultiplier
): ThemeMultiplier => {
  return (index: number) => Math.round(index) * settings;
};

const createThemeStyle = (series: ThemeSettingsStyle): ThemeStyle => {
  return (indexProvided: number): ThemeStyleValue => {
    if (!series.length) {
      return {};
    }

    const index = Math.round(indexProvided);
    return series[index] || series[series.length - 1];
  };
};

const minMax = (min: number, max: number) => (value: number) =>
  Math.min(max, Math.max(min, value));
const minMax0to1 = minMax(0, 1);
const minMax0to100 = minMax(0, 100);
const fromArrayToHSLA = (src: [number, number, number, number?]): string => {
  const [H, s, l, a] = src;
  const S = minMax0to100(s);
  const L = minMax0to100(l);
  const A = minMax0to1(a ?? 1);
  return `hsla(${H}, ${S}%, ${L}%, ${A})`;
};

const createThemeColor = (createColor: ThemeSettingsColor): ThemeColor => {
  return (index: number): string => {
    const color = createColor(Math.round(index));
    return fromArrayToHSLA(color);
  };
};

const createThemeColorPalette = (hue: number, colorScheme: ThemeColorScheme): ThemePalette => {
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
}

const createTheme = (colorScheme: ThemeColorScheme): Theme => {
  return {
    space: createThemeMultiplier(4),
    typography: {
      heading: createThemeStyle([
        {
          fontSize: 24,
          fontFamily: '"Titillium Web", sans-serif',
          fontWeight: '600',
          textTransform: 'uppercase'
        },
        {
          fontSize: 21,
          fontFamily: '"Titillium Web", sans-serif',
          fontWeight: '600',
          textTransform: 'uppercase'
        },
        {
          fontSize: 18,
          fontFamily: '"Titillium Web", sans-serif',
          fontWeight: '600',
          textTransform: 'uppercase'
        },
        {
          fontSize: 16,
          fontFamily: '"Titillium Web", sans-serif',
          fontWeight: '600',
          textTransform: 'uppercase'
        }
      ]),
      body: createThemeStyle([
        {
          fontSize: 18,
          fontFamily: '"Titillium Web", sans-serif',
          fontWeight: '400'
        },
        {
          fontSize: 16,
          fontFamily: '"Titillium Web", sans-serif',
          fontWeight: '400'
        },
        {
          fontSize: 14,
          fontFamily: '"Titillium Web", sans-serif',
          fontWeight: '400'
        }
      ]),
      cta: createThemeStyle([
        {
          fontSize: 16,
          fontFamily: '"Titillium Web", sans-serif',
          fontWeight: '400',
          textTransform: 'uppercase'
        },
        {
          fontSize: 14,
          fontFamily: '"Titillium Web", sans-serif',
          fontWeight: '400',
          textTransform: 'uppercase'
        }
      ]),
      code: createThemeStyle([
        {
          fontSize: 16,
          fontFamily: '"Source Code Pro", Menlo, Monaco, "Courier New", monospace',
          fontWeight: '400'
        },
        {
          fontSize: 14,
          fontFamily: '"Source Code Pro", Menlo, Monaco, "Courier New", monospace',
          fontWeight: '400'
        }
      ])
    },
    colorScheme,
    colors: {
      primary: createThemeColorPalette(180, colorScheme),
      secondary: createThemeColorPalette(60, colorScheme)
    },
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
