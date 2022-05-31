import type {
  NTThemeSettingsColor,
  NTThemeSettingsColorValue,
  NTThemeSettingsColorPatch,
  NTThemeColor
} from '../../../types';

const minMax = (min: number, max: number) => (value: number) =>
  Math.min(max, Math.max(min, value));
const minMax0to1 = minMax(0, 1);
const minMax0to100 = minMax(0, 100);

const patchColor = (
  color: NTThemeSettingsColorValue,
  patch: NTThemeSettingsColorPatch
): NTThemeSettingsColorValue => {
  return [
    color[0],
    patch[0] ?? color[1],
    patch[1] ?? color[2],
    patch[2] ?? color[3]
  ];
};

const fromArrayToHSLA = (src: NTThemeSettingsColorValue): string => {
  const [H, s, l, a] = src;
  const S = minMax0to100(s);
  const L = minMax0to100(l);
  const A = minMax0to1(a ?? 1);
  return `hsla(${H}, ${S}%, ${L}%, ${A})`;
};

const createThemeColor = (createColor: NTThemeSettingsColor): NTThemeColor => {
  return (index: number, colorPatch?: NTThemeSettingsColorPatch): string => {
    const color = createColor(Math.round(index));
    return fromArrayToHSLA(colorPatch ? patchColor(color, colorPatch) : color);
  };
};

export { createThemeColor };
