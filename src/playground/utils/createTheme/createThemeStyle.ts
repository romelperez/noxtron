import type {
  NTThemeSettingsStyle,
  NTThemeStyle,
  NTThemeStyleValue
} from '../../../types';

const createThemeStyle = (series: NTThemeSettingsStyle): NTThemeStyle => {
  return (indexProvided: number): NTThemeStyleValue => {
    if (!series.length) {
      return {};
    }

    const index = Math.round(indexProvided);
    return series[index] || series[series.length - 1];
  };
};

export { createThemeStyle };
