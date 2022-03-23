import React, { ReactElement, useMemo } from 'react';
import { ThemeProvider, Theme, Global } from '@emotion/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import type { Config } from '../../../types';
import { createTheme } from '../../../utils/createTheme';
import { useRouterState } from '../../../utils/useRouterState';
import { StoreProvider } from '../StoreProvider';
import { App } from '../App';
import { createStyles } from './Playground.styles';

const PlaygroundRouted = (): ReactElement => {
  const routerState = useRouterState();

  const theme: Theme = useMemo(() => {
    const colorScheme = routerState.optionsBooleans.dark ? 'dark' : 'light';
    return createTheme(colorScheme);
  }, [routerState.optionsBooleans.dark]);

  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <ThemeProvider theme={theme}>
      <Global styles={styles.global} />
      <StoreProvider>
        <App />
      </StoreProvider>
    </ThemeProvider>
  );
};

const Playground = (): ReactElement => {
  const noxtronConfig: Config = (window as any).noxtronConfig;
  const { basePath = '/' } = noxtronConfig;

  return (
    <BrowserRouter basename={basePath}>
      <Routes>
        <Route
          path='*'
          element={<PlaygroundRouted />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export { Playground };
