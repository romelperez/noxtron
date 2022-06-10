import type { NTAppPlaygroundSettings, NTMonaco } from '../types';
import * as monaco from '../monaco';
import {
  renderPlayground,
  RenderPlaygroundGetSettings
} from '../playground/utils/renderPlayground';

const defaultSettings: Partial<NTAppPlaygroundSettings> = {
  getMonaco: () => monaco as unknown as NTMonaco
};

const win = window as any;

win.noxtronPlayground = win.noxtronPlayground || {};

win.noxtronPlayground.renderPlayground = (
  getSettingsProvided: RenderPlaygroundGetSettings,
  element: HTMLElement
): void => {
  const getSettings: RenderPlaygroundGetSettings = (dependencies) => ({
    ...defaultSettings,
    ...getSettingsProvided(dependencies)
  });

  renderPlayground(getSettings, element);
};
