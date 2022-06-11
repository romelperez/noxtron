import React from 'react';
import { render } from 'react-dom';
import * as emotion from '@emotion/react';

import { NTAppPlaygroundSettings } from '../../../types';
import { Playground } from '../Playground';
import { sendSetupState } from '../../events';
import { loadDependencies } from '../../effects';
import { integrate } from '../integrate';
import * as UI from '../../ui';
import * as playgroundUtils from '../../utils';
import * as globalUtils from '../../../utils';

interface SetupPlaygroundGetSettingsDependencies {
  React: typeof React;
  emotion: typeof emotion;
}

type SetupPlaygroundGetSettings = (
  dependencies: SetupPlaygroundGetSettingsDependencies
) => NTAppPlaygroundSettings;

const setupPlayground = (getSettings: SetupPlaygroundGetSettings): void => {
  const settings = getSettings({
    ...UI,
    ...playgroundUtils,
    ...globalUtils,
    React,
    emotion
  });

  integrate();

  sendSetupState(settings);

  loadDependencies();

  render(<Playground />, settings.element as HTMLDivElement);
};

export type {
  SetupPlaygroundGetSettingsDependencies,
  SetupPlaygroundGetSettings
};
export { setupPlayground };
