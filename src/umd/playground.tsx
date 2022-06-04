import React from 'react';
import { render } from 'react-dom';
import * as emotionReact from '@emotion/react';

import type { NTPlaygroundSettings } from '../types';
import { Playground } from '../playground/containers/Playground';
import * as monaco from '../monaco';

const defaultSettings: Partial<NTPlaygroundSettings> = {
  getMonaco: () => monaco as any
};

interface PlaygroundDependencies {
  React: typeof React;
  '@emotion/react': typeof emotionReact;
}

type PlaygroundInjectDependencies = (dependencies: PlaygroundDependencies) => {
  settings: NTPlaygroundSettings;
  element: HTMLElement;
};

const win = window as any;

win.noxtronPlayground = win.noxtronPlayground || {};

win.noxtronPlayground.renderPlayground = (
  injectDependencies: PlaygroundInjectDependencies
): void => {
  const setup = injectDependencies({
    React,
    '@emotion/react': emotionReact
  });
  const settings: NTPlaygroundSettings = {
    ...defaultSettings,
    ...setup.settings
  };

  render(<Playground settings={settings} />, setup.element);
};
