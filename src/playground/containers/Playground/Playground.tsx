import React, { ReactElement, useMemo } from 'react';
import { ThemeProvider, Theme } from '@emotion/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import * as monaco from 'monaco-editor';

import type { NTUserConfig } from '../../../types';
import { createTheme } from '../../utils/createTheme';
import { useRouterState } from '../../utils/useRouterState';
import { UserConfigProvider } from '../UserConfigProvider';
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
  const { basePath, typeDefinitions = [] } = config;

  // @ts-ignore
  window.MonacoEnvironment = {
    getWorkerUrl: (moduleId: string, label: string) => {
      const basePathPrefix = basePath.endsWith('/') ? basePath : `${basePath}/`;
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
