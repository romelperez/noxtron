import type { NTPlaygroundSettings } from '../types';
import * as monaco from '../monaco';
import { renderPlayground } from '../playground/utils/renderPlayground';
import { PlaygroundProps } from '../playground/containers/Playground';

const defaultSettings: Partial<NTPlaygroundSettings> = {
  getMonaco: () => monaco as any
};

const win = window as any;

win.noxtronPlayground = win.noxtronPlayground || {};

win.noxtronPlayground.renderPlayground = (
  getSettingsProvided: PlaygroundProps['getSettings'],
  element: HTMLElement
): void => {
  const getSettings: PlaygroundProps['getSettings'] = (dependencies) => ({
    ...defaultSettings,
    ...getSettingsProvided(dependencies)
  });

  renderPlayground(getSettings, element);
};
