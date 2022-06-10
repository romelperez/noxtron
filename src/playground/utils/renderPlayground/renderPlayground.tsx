import React from 'react';
import { render } from 'react-dom';
import * as emotion from '@emotion/react';

import { NTAppPlaygroundSettings } from '../../../types';
import { Playground } from '../../containers';
import { loadDependencies, sendSetupState } from '../../services';
import * as UI from '../../ui';
import * as playgroundUtils from '../../utils';
import * as globalUtils from '../../../utils';

interface RenderPlaygroundGetSettingsDependencies {
  React: typeof React;
  emotion: typeof emotion;
}

type RenderPlaygroundGetSettings = (
  dependencies: RenderPlaygroundGetSettingsDependencies
) => NTAppPlaygroundSettings;

const renderPlayground = (
  getSettings: RenderPlaygroundGetSettings,
  element: HTMLElement
): void => {
  const settings = getSettings({
    ...UI,
    ...playgroundUtils,
    ...globalUtils,
    React,
    emotion
  });

  sendSetupState(settings);

  loadDependencies();

  render(<Playground />, element);
};

export type {
  RenderPlaygroundGetSettingsDependencies,
  RenderPlaygroundGetSettings
};
export { renderPlayground };
