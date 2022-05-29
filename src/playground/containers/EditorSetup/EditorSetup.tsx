import React, { ReactElement, useEffect } from 'react';
import * as monaco from 'monaco-editor';

import { NTMonacoCompilerOptions } from '../../../types';
import { usePlaygroundSettings } from '../../utils/usePlaygroundSettings';
import { useRouterState } from '../../utils/useRouterState';
import { useStore } from '../../utils/useStore';

const EditorSetup = (): ReactElement => {
  const settings = usePlaygroundSettings();
  const routerState = useRouterState();
  const exploration = useStore((state) => state.exploration);
  const editor = useStore((state) => state.editor);
  const updateEditor = useStore((state) => state.updateEditor);

  useEffect(() => {
    const { getTypeDefinitions } = settings;

    if (getTypeDefinitions) {
      updateEditor({ isTypeDefinitionsLoading: true });

      Promise.resolve()
        .then(() => getTypeDefinitions())
        .then((typeDefinitions) => updateEditor({ typeDefinitions }))
        .catch(() => updateEditor({ isTypeDefinitionsError: true }))
        .finally(() => updateEditor({ isTypeDefinitionsLoading: false }));
    } else {
      updateEditor({ isTypeDefinitionsLoading: false });
    }
  }, []);

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

    // Re-enable type checking and syntax validation.
    typescript.typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: false,
      noSyntaxValidation: false
    });
  }, []);

  useEffect(() => {
    const { typeDefinitions } = editor;
    const { typescript } = monaco.languages;

    typeDefinitions.forEach(({ filename, code }) => {
      typescript.typescriptDefaults.addExtraLib(code, filename);
    });
  }, [editor.typeDefinitions]);

  useEffect(() => {
    const { codeLanguage } = settings;

    const codeInitial = '';
    const filename = monaco.Uri.parse(
      codeLanguage === 'typescript' ? 'sandbox.tsx' : 'sandbox.jsx'
    );
    const model = monaco.editor.createModel(
      codeInitial,
      codeLanguage,
      filename
    );
    const getValue = (): string => model.getValue();
    const setValue = (newValue: string): void => {
      if (newValue !== model.getValue()) {
        model.setValue(newValue);
      }
    };

    updateEditor({ model, getValue, setValue });
  }, []);

  useEffect(() => {
    const { sandboxSelected } = exploration;

    if (sandboxSelected) {
      const newSandboxCode = sandboxSelected.code || '';
      editor.setValue(newSandboxCode);
    }
  }, [exploration.sandboxSelected]);

  useEffect(() => {
    const { editorCustomSandboxMsg } = settings;
    const { type, code } = routerState.optionsControls;

    if (type === 'custom') {
      editor.setValue(code || (editorCustomSandboxMsg as string));
    }
  }, [routerState.optionsControls.type, routerState.optionsControls.code]);

  return <></>;
};

export { EditorSetup };
