import React, { ReactElement, useMemo } from 'react';
import { ThemeProvider, Theme } from '@emotion/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import * as monaco from 'monaco-editor';

import type { NTPlaygroundSettings } from '../../../types';
import { createTheme } from '../../utils/createTheme';
import { useRouterState } from '../../utils/useRouterState';
import { PlaygroundSettingsProvider } from '../PlaygroundSettingsProvider';
import { usePlaygroundSettings } from '../../utils/usePlaygroundSettings';
import { App } from '../../components/App';
import { StoreProvider } from '../StoreProvider';

const PlaygroundRouted = (): ReactElement => {
  const routerState = useRouterState();
  const settings = usePlaygroundSettings();

  const theme: Theme = useMemo(() => {
    const colorScheme = routerState.optionsBooleans.dark ? 'dark' : 'light';
    return createTheme(colorScheme, settings.theme);
  }, [routerState.optionsBooleans.dark, settings.theme]);

  return (
    <ThemeProvider theme={theme}>
      <StoreProvider>
        <App />
      </StoreProvider>
    </ThemeProvider>
  );
};

interface PlaygroundProps extends NTPlaygroundSettings {}

const Playground = (props: PlaygroundProps): ReactElement => {
  const { basePath, typeDefinitions = [] } = props;
  const basePathPrefix = basePath.endsWith('/') ? basePath : `${basePath}/`;

  // @ts-ignore
  window.MonacoEnvironment = {
    getWorkerUrl: (moduleId: string, label: string) => {
      if (label === 'typescript' || label === 'javascript') {
        return `${basePathPrefix}ts.worker.js`;
      }
      return `${basePathPrefix}editor.worker.js`;
    }
  };

  const { typescript } = monaco.languages;

  // Disable type checking and syntax validation before adding type definitions.
  typescript.typescriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: true,
    noSyntaxValidation: true
  });

  typescript.typescriptDefaults.setCompilerOptions({
    module: typescript.ModuleKind.ESNext,
    moduleResolution: typescript.ModuleResolutionKind.NodeJs,
    target: typescript.ScriptTarget.ES2015,
    jsx: typescript.JsxEmit.React,
    esModuleInterop: true,
    allowNonTsExtensions: true,
    allowSyntheticDefaultImports: true,
    baseUrl: 'file:///',
    paths: typescript.typescriptDefaults.getCompilerOptions().paths
  });

  typeDefinitions.forEach(({ filename, code }) => {
    typescript.typescriptDefaults.addExtraLib(code, filename);
  });

  // Re-enable type checking and syntax validation.
  typescript.typescriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: false,
    noSyntaxValidation: false
  });

  return (
    <BrowserRouter basename={basePath}>
      <Routes>
        <Route
          path="*"
          element={
            <PlaygroundSettingsProvider settings={props}>
              <PlaygroundRouted />
            </PlaygroundSettingsProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export type { PlaygroundProps };
export { Playground };
