import type { NTThemeSettingsColor, NTThemeColor } from '../../../types';

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

export { createThemeColor };
