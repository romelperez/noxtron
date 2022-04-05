// TODO: Allow to decouple typeDefinitions and sandboxes in different bundles
// programatically, instead of the same one, to fasten loading time.

import React, { ReactElement } from 'react';

import type { NTPlaygroundSettings } from '../../../types';
import { PlaygroundSettingsProvider } from '../PlaygroundSettingsProvider';
import { RouterProvider } from '../RouterProvider';
import { RouterStateProvider } from '../RouterStateProvider';
import { ThemeProvider } from '../ThemeProvider';
import { StoreProvider } from '../StoreProvider';
import { App } from '../../components/App';

interface PlaygroundProps {
  settings: NTPlaygroundSettings;
}

const Playground = (props: PlaygroundProps): ReactElement => {
  const { settings } = props;

  return (
    <PlaygroundSettingsProvider settings={settings}>
      <RouterProvider>
        <RouterStateProvider>
          <ThemeProvider>
            <StoreProvider>
              <App />
            </StoreProvider>
          </ThemeProvider>
        </RouterStateProvider>
      </RouterProvider>
    </PlaygroundSettingsProvider>
  );
};

export type { PlaygroundProps };
export { Playground };
