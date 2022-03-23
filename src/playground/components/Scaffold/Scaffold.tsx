import React, { ReactElement, useMemo } from 'react';
import { ThemeProvider, Theme, Global } from '@emotion/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import * as monaco from 'monaco-editor';

import { createTheme } from '@src/utils/createTheme';
import { useRouterState } from '@src/utils/useRouterState';
import { StoreProvider } from '../StoreProvider';
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

// Validation settings.
monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
  noSemanticValidation: true,
  noSyntaxValidation: false
});

// Compiler options.
monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
  target: monaco.languages.typescript.ScriptTarget.ES2015,
  allowNonTsExtensions: true
});

const libSource = 'declare const render: (element: unknown) => void;';
const libUri = 'ts:filename/render.d.ts';

monaco.languages.typescript.javascriptDefaults.addExtraLib(libSource, libUri);

// When resolving definitions and references, the editor will try to use created models.
// Creating a model for the library allows "peek definition/references" commands to work with the library.
monaco.editor.createModel(libSource, 'typescript', monaco.Uri.parse(libUri));

const ScaffoldRouted = (): ReactElement => {
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
