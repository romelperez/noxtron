import React, { ReactElement, useMemo } from 'react';
import { ThemeProvider, Theme } from '@emotion/react';
import * as monaco from 'monaco-editor';

import type { NTPlaygroundSettings } from '../../../types';
import { createTheme } from '../../utils/createTheme';
import { useRouterState } from '../../utils/useRouterState';
import { PlaygroundSettingsProvider } from '../PlaygroundSettingsProvider';
import { usePlaygroundSettings } from '../../utils/usePlaygroundSettings';
import { RouterProvider } from '../RouterProvider';
import { RouterStateProvider } from '../RouterStateProvider';
import { StoreProvider } from '../StoreProvider';
import { App } from '../../components/App';

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

interface PlaygroundProps {
  settings: NTPlaygroundSettings;
}

const Playground = (props: PlaygroundProps): ReactElement => {
  const { settings } = props;
  const { basePath, typeDefinitions = [] } = settings;
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
    <PlaygroundSettingsProvider settings={settings}>
      <RouterProvider>
        <RouterStateProvider>
          <PlaygroundRouted />
        </RouterStateProvider>
      </RouterProvider>
    </PlaygroundSettingsProvider>
  );
};

export type { PlaygroundProps };
export { Playground };
