// TODO: Show loading indicator for editor and preview panels when they are
// working/processing the sandbox data.

// TODO: In mobile, the default panel should be the explorer.

import React, { ReactElement } from 'react';

import type { NTPlaygroundSettings } from '../../../types';
import { PlaygroundSetupProvider } from '../PlaygroundSetupProvider';
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
    <PlaygroundSetupProvider settings={settings}>
      <RouterProvider>
        <RouterStateProvider>
          <ThemeProvider>
            <StoreProvider>
              <App />
            </StoreProvider>
          </ThemeProvider>
        </RouterStateProvider>
      </RouterProvider>
    </PlaygroundSetupProvider>
  );
};

export type { PlaygroundProps };
export { Playground };
