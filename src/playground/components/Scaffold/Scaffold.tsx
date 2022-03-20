import React, { ReactElement, useMemo } from 'react';
import { ThemeProvider, Theme, Global } from '@emotion/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { createTheme } from '@src/utils/createTheme';
import { useRouterState } from '@src/utils/useRouterState';
import { App } from '../App';
import { createStyles } from './Scaffold.styles';

// @ts-ignore
window.MonacoEnvironment = {
	getWorkerUrl: (_moduleId: any, label: string) => {
    switch (label) {
      case 'json': return '/play/monaco.json.worker.js';
      case 'css':
      case 'scss':
      case 'less': return '/play/monaco.css.worker.js';
      case 'html': return '/play/monaco.html.worker.js';
      case 'typescript':
      case 'javascript': return '/play/monaco.ts.worker.js';
      default: return '/play/monaco.editor.worker.js';
    }
	}
};

const ScaffoldRouted = (): ReactElement => {
  const routerState = useRouterState();

  const theme: Theme = useMemo(() => {
    const colorScheme = routerState.optionsBooleans.dark ? 'dark' : 'light';
    return createTheme(colorScheme);
  }, [routerState]);

  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <ThemeProvider theme={theme}>
      <Global styles={styles.global} />
      <App />
    </ThemeProvider>
  );
};

const Scaffold = (): ReactElement => {
  return (
    <BrowserRouter basename='/play'>
      <Routes>
        <Route
          path='*'
          element={<ScaffoldRouted />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export { Scaffold };
