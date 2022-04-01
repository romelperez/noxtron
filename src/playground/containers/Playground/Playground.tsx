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
  const { basePath, types = '' } = config;

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

  monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: true,
    noSyntaxValidation: false
  });

  monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
    module: monaco.languages.typescript.ModuleKind.ESNext,
    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
    target: monaco.languages.typescript.ScriptTarget.ES2015,
    jsx: monaco.languages.typescript.JsxEmit.React,
    jsxFactory: 'React.createElement',
    esModuleInterop: true,
    allowNonTsExtensions: true,
    allowSyntheticDefaultImports: true
  });

  const typesFileUri = 'ts:filename/global.d.ts';
  const typesFileSrc = types;

  monaco.languages.typescript.javascriptDefaults.addExtraLib(
    typesFileSrc,
    typesFileUri
  );

  monaco.editor.createModel(
    typesFileSrc,
    'typescript',
    monaco.Uri.parse(typesFileUri)
  );

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
