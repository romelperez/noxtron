import React from 'react';
import { render } from 'react-dom';
import emotion from '@emotion/react';

import type { NTPlaygroundSettings } from '../types';
import { Playground } from '../playground/containers/Playground';
import * as monaco from '../monaco';

interface PlaygroundPropsGetSettingsDependencies {
  React: typeof React;
  emotion: typeof emotion;
}

const defaultSettings: Partial<NTPlaygroundSettings> = {
  getMonaco: () => monaco as any
};

const win = window as any;

win.noxtronPlayground = win.noxtronPlayground || {};

win.noxtronPlayground.renderPlayground = (
  getSettingsProvided: (
    dependencies: PlaygroundPropsGetSettingsDependencies
  ) => NTPlaygroundSettings,
  element: HTMLElement
): void => {
  const getSettings = (
    dependencies: PlaygroundPropsGetSettingsDependencies
  ) => ({
    ...defaultSettings,
    ...getSettingsProvided(dependencies)
  });

  render(<Playground getSettings={getSettings} />, element);
};
