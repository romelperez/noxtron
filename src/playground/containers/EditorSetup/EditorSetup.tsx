import React, { ReactElement, useEffect } from 'react';

import { NTMonacoCompilerOptions } from '../../../types';
import { usePlaygroundSettings } from '../../utils/usePlaygroundSettings';
import { useRouterState } from '../../utils/useRouterState';
import { useStore } from '../../utils/useStore';

const EditorSetup = (): ReactElement => {
  const settings = usePlaygroundSettings();
  const routerState = useRouterState();
  const monaco = useStore((state) => state.monaco);
  const model = useStore((state) => state.model);
  const typeDefinitions = useStore((state) => state.typeDefinitions);
  const sandboxSelected = useStore((state) => state.sandboxSelected);

  useEffect(() => {
    const { basePath } = settings;
    const basePathPrefix = basePath.endsWith('/') ? basePath : `${basePath}/`;
    const { typescript } = monaco.languages;

    // @ts-ignore
    window.MonacoEnvironment = {
      getWorkerUrl: (moduleId: string, label: string): string => {
        if (label === 'typescript' || label === 'javascript') {
          return `${basePathPrefix}ts.worker.js`;
        }
        return `${basePathPrefix}editor.worker.js`;
      }
    };

    // Disable type checking and syntax validation before adding type definitions.
    typescript.typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntaxValidation: true
    });

    const defaultCompilerOptions: NTMonacoCompilerOptions = {
      module: typescript.ModuleKind.ESNext,
      moduleResolution: typescript.ModuleResolutionKind.NodeJs,
      target: typescript.ScriptTarget.ES2015,
      jsx: typescript.JsxEmit.React,
      esModuleInterop: true,
      allowNonTsExtensions: true,
      allowSyntheticDefaultImports: true,
      baseUrl: 'file:///',
      paths: typescript.typescriptDefaults.getCompilerOptions().paths
    };

    typescript.javascriptDefaults.setCompilerOptions(defaultCompilerOptions);
    typescript.typescriptDefaults.setCompilerOptions(defaultCompilerOptions);

    typeDefinitions.forEach(({ filename, code }) => {
      monaco.languages.typescript.typescriptDefaults.addExtraLib(
        code,
        filename
      );
    });

    // Re-enable type checking and syntax validation.
    typescript.typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: false,
      noSyntaxValidation: false
    });
  }, []);

  useEffect(() => {
    if (sandboxSelected) {
      const newSandboxCode = sandboxSelected.code || '';
      model.setValue(newSandboxCode);
    }
  }, [sandboxSelected]);

  useEffect(() => {
    const { editorCustomSandboxMsg } = settings;
    const { type, code } = routerState.optionsControls;

    if (type === 'custom') {
      model.setValue(code || (editorCustomSandboxMsg as string));
    }
  }, [routerState.optionsControls.type, routerState.optionsControls.code]);

  return <></>;
};

export { EditorSetup };
