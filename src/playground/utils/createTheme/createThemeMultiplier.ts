import type {
  NTThemeSettingsMultiplier,
  NTThemeMultiplier
} from '../../../types';

const createThemeMultiplier = (
  settings: NTThemeSettingsMultiplier
): NTThemeMultiplier => {
  return (index: number) => Math.round(index) * settings;
};

export { createThemeMultiplier };
