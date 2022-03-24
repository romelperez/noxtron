import type {
  NTThemeSettingsMultiplier,
  NTThemeSettingsStyle,
  NTThemeSettingsColor,
  NTThemeMultiplier,
  NTThemeStyle,
  NTThemeStyleValue,
  NTThemeColor,
  NTThemePalette,
  NTThemeColorScheme,
  NTTheme
} from '../../types';
import { getUserGlobalConfig } from '../getUserGlobalConfig';

const createThemeMultiplier = (
  settings: NTThemeSettingsMultiplier
): NTThemeMultiplier => {
  return (index: number) => Math.round(index) * settings;
};

const createThemeStyle = (series: NTThemeSettingsStyle): NTThemeStyle => {
  return (indexProvided: number): NTThemeStyleValue => {
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

const createThemeColor = (createColor: NTThemeSettingsColor): NTThemeColor => {
  return (index: number): string => {
    const color = createColor(Math.round(index));
    return fromArrayToHSLA(color);
  };
};

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

const createTheme = (colorScheme: NTThemeColorScheme): NTTheme => {
  const { theme: userTheme } = getUserGlobalConfig();

  return {
    space: createThemeMultiplier(4),
    typography: {
      heading: createThemeStyle([
        {
          textTransform: 'uppercase',
          ...userTheme?.typography?.heading,
          fontSize: 24
        },
        {
          textTransform: 'uppercase',
          ...userTheme?.typography?.heading,
          fontSize: 21
        },
        {
          textTransform: 'uppercase',
          ...userTheme?.typography?.heading,
          fontSize: 18
        }
      ]),
      body: createThemeStyle([
        {
          ...userTheme?.typography?.body,
          fontSize: 18
        },
        {
          ...userTheme?.typography?.body,
          fontSize: 16
        },
        {
          ...userTheme?.typography?.body,
          fontSize: 14
        }
      ]),
      cta: createThemeStyle([
        {
          textTransform: 'uppercase',
          ...userTheme?.typography?.cta,
          fontSize: 16
        },
        {
          textTransform: 'uppercase',
          ...userTheme?.typography?.cta,
          fontSize: 14
        }
      ]),
      code: createThemeStyle([
        {
          ...userTheme?.typography?.code,
          fontSize: 16
        },
        {
          ...userTheme?.typography?.code,
          fontSize: 14
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
