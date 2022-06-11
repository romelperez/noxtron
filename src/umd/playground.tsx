import type { NTAppPlaygroundSettings, NTMonaco } from '../types';
import * as monaco from '../monaco';
import {
  setupPlayground,
  SetupPlaygroundGetSettings
} from '../playground/containers/setupPlayground';

const defaultSettings: Partial<NTAppPlaygroundSettings> = {
  getMonaco: () => monaco as unknown as NTMonaco
};

const win = window as any;

win.noxtron = win.noxtron || {};

win.noxtron.setupPlayground = (
  getSettingsProvided: SetupPlaygroundGetSettings
): void => {
  const getSettings: SetupPlaygroundGetSettings = (dependencies) => ({
    ...defaultSettings,
    ...getSettingsProvided(dependencies)
  });

  setupPlayground(getSettings);
};
