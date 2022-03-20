import type {
  ThemeSettingsMultiplier,
  ThemeSettingsStyle,
  ThemeSettingsColor,
  ThemeMultiplier,
  ThemeStyle,
  ThemeStyleValue,
  ThemeColor,
  Theme
} from '../../types';

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

const createTheme = (): Theme => {
  return {
    space: createThemeMultiplier(4),
    typography: {
      heading: createThemeStyle([
        {
          fontSize: 28,
          fontFamily: '"Titillium Web", sans-serif',
          fontWeight: '600',
          textTransform: 'uppercase'
        },
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
          fontFamily: '"Source Code Pro", monospace',
          fontWeight: '400'
        },
        {
          fontSize: 14,
          fontFamily: '"Source Code Pro", monospace',
          fontWeight: '400'
        }
      ])
    },
    colors: {
      primary: {
        text: createThemeColor((i) => [180, 50, i * 5, 1]),
        textHigh: createThemeColor((i) => [180, 90, i * 5, 1]),
        deco: createThemeColor((i) => [180, 30, i * 5, 1]),
        decoHigh: createThemeColor((i) => [180, 70, i * 5, 1]),
        level: createThemeColor((i) => [180, 30, 75, 0.04 * i]),
        levelHigh: createThemeColor((i) => [180, 80, 75, 0.04 * i]),
        bg: createThemeColor((i) => [180, 5, i * 2, 1]),
        overlay: createThemeColor((i) => [180, 10, i * 5, 0.65])
      },
      secondary: {
        text: createThemeColor((i) => [60, 50, i * 5, 1]),
        textHigh: createThemeColor((i) => [60, 90, i * 5, 1]),
        deco: createThemeColor((i) => [60, 30, i * 5, 1]),
        decoHigh: createThemeColor((i) => [60, 70, i * 5, 1]),
        level: createThemeColor((i) => [60, 30, 75, 0.04 * i]),
        levelHigh: createThemeColor((i) => [60, 80, 75, 0.04 * i]),
        bg: createThemeColor((i) => [60, 5, i * 2, 1]),
        overlay: createThemeColor((i) => [60, 10, i * 5, 0.65])
      }
    },
    breakpoints: {
      medium: {
        up: '@media (min-width: 768px)',
        down: '@media (max-width: 767px)'
      },
      large: {
        up: '@media (min-width: 1280px)',
        down: '@media (max-width: 1279px)'
      }
    }
  };
};

export { createTheme };
