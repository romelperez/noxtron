import React, { ReactElement } from 'react';
import * as monaco from 'monaco-editor';

import type { NTPlaygroundSettings } from '../../../types';
import { PlaygroundSettingsProvider } from '../PlaygroundSettingsProvider';
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
          <ThemeProvider>
            <StoreProvider>
              <App />
            </StoreProvider>
          </ThemeProvider>
        </RouterStateProvider>
      </RouterProvider>
    </PlaygroundSettingsProvider>
  );
};

export type { PlaygroundProps };
export { Playground };
