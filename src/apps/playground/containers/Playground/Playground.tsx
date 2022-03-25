import React, { ReactElement, useMemo } from 'react';
import { ThemeProvider, Theme } from '@emotion/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import type { NTUserConfig } from '../../../types';
import { createTheme } from '../../utils/createTheme';
import { useRouterState } from '../../utils/useRouterState';
import { UserConfigProvider } from '../../containers/UserConfigProvider';
import { useUserConfig } from '../../utils/useUserConfig';
import { App } from '../../components/App';
import { StoreProvider } from '../StoreProvider';

const PlaygroundRouted = (): ReactElement => {
  const routerState = useRouterState();
  const userConfig = useUserConfig();

  const theme: Theme = useMemo(() => {
    const colorScheme = routerState.optionsBooleans.dark ? 'dark' : 'light';
    return createTheme(colorScheme, userConfig.theme);
  }, [routerState.optionsBooleans.dark, userConfig.theme]);

  return (
    <ThemeProvider theme={theme}>
      <StoreProvider>
        <App />
      </StoreProvider>
    </ThemeProvider>
  );
};

interface PlaygroundProps {
  config: NTUserConfig;
}

const Playground = (props: PlaygroundProps): ReactElement => {
  const { config } = props;
  const { basePath } = config;

  return (
    <BrowserRouter basename={basePath}>
      <Routes>
        <Route
          path="*"
          element={
            <UserConfigProvider config={config}>
              <PlaygroundRouted />
            </UserConfigProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export type { PlaygroundProps };
export { Playground };
