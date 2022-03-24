import React, { ReactElement, useMemo } from 'react';
import { ThemeProvider, Theme, Global } from '@emotion/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { createTheme } from '../../../utils/createTheme';
import { useRouterState } from '../../../utils/useRouterState';
import { getUserGlobalConfig } from '../../../utils/getUserGlobalConfig';
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
  const { basePath } = getUserGlobalConfig();

  return (
    <BrowserRouter basename={basePath}>
      <Routes>
        <Route path="*" element={<PlaygroundRouted />} />
      </Routes>
    </BrowserRouter>
  );
};

export { Playground };
