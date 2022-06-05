import React, { ReactElement, useState } from 'react';
import emotion from '@emotion/react';

import type { NTPlaygroundSettings } from '../../../types';
import { PlaygroundSettingsProvider } from '../PlaygroundSettingsProvider';
import { RouterProvider } from '../RouterProvider';
import { RouterStateProvider } from '../RouterStateProvider';
import { ThemeProvider } from '../ThemeProvider';
import { PlaygroundSetup } from '../PlaygroundSetup';
import { App } from '../App';
import * as UI from '../../ui';

interface PlaygroundPropsGetSettingsDependencies {
  React: typeof React;
  emotion: typeof emotion;
}

interface PlaygroundProps {
  getSettings: (
    dependencies: PlaygroundPropsGetSettingsDependencies
  ) => NTPlaygroundSettings;
}

const Playground = (props: PlaygroundProps): ReactElement => {
  const { getSettings } = props;

  const [settings] = useState<NTPlaygroundSettings>(() =>
    getSettings({
      ...UI,
      React,
      emotion
    })
  );

  return (
    <PlaygroundSettingsProvider settings={settings}>
      <RouterProvider>
        <RouterStateProvider>
          <ThemeProvider>
            <PlaygroundSetup />
            <App />
          </ThemeProvider>
        </RouterStateProvider>
      </RouterProvider>
    </PlaygroundSettingsProvider>
  );
};

export type { PlaygroundProps };
export { Playground };
