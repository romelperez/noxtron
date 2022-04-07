import React, {
  ReactNode,
  ReactElement,
  useState,
  useEffect,
  useMemo,
  useRef
} from 'react';
import * as monaco from 'monaco-editor';

import type {
  NTMonacoCompilerOptions,
  NTSandbox,
  NTStoreEvent,
  NTStoreSubscriber,
  NTStoreEditorModel,
  NTStoreSandboxTranspilation,
  NTStore
} from '../../../types';
import { StoreContext } from '../../utils/StoreContext';
import { useRouterState } from '../../utils/useRouterState';
import { usePlaygroundSettings } from '../../utils/usePlaygroundSettings';
import { findSandboxByPath } from '../../utils/findSandboxByPath';
import { transpile } from '../../utils/transpile';

// TODO: Support back/forward browser navigation.
// URL changes are not reflected on editor model.

type StoreSubscriptions = {
  [event in NTStoreEvent]?: Set<NTStoreSubscriber>;
};

interface StoreProviderProps {
  children: ReactNode;
}

const sandboxTranspilationInitial: NTStoreSandboxTranspilation = {
  importsLines: [],
  // Include an empty piece of code so the sandbox receives something valid
  // to execute until the first real compilation occurs. Otherwise, it will
  // throw an error for empty editor code.
  code: '// NOT READY',
  error: ''
};

const StoreProvider = (props: StoreProviderProps): ReactElement => {
  const { children } = props;

  const {
    basePath,
    codeLanguage,
    typeDefinitions,
    sandboxes,
    onSandboxChange
  } = usePlaygroundSettings();
  const routerState = useRouterState();

  const [sandboxSelected, setSandboxSelected] = useState<NTSandbox | null>(
    null
  );
  const [sandboxTranspilation, setSandboxTranspilation] = useState(
    sandboxTranspilationInitial
  );
  const subscriptionsRef = useRef<StoreSubscriptions>({});
  const routerStateRef = useRef(routerState);

  routerStateRef.current = routerState;

  const editorModel: NTStoreEditorModel = useMemo(() => {
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

    return Object.freeze({ model, getValue, setValue });
  }, []);

  const store = useMemo(() => {
    const store: NTStore = {
      editorModel,
      sandboxSelected,
      sandboxTranspilation,
      subscribe: (event, subscriber) => {
        subscriptionsRef.current[event] =
          subscriptionsRef.current[event] || new Set();
        subscriptionsRef.current[event]?.add(subscriber);
      },
      unsubscribe: (event, subscriber) => {
        subscriptionsRef.current[event]?.delete(subscriber);
      },
      trigger: (event) => {
        subscriptionsRef.current[event]?.forEach((subscribe) => subscribe());
      }
    };
    return store;
  }, [editorModel, sandboxSelected, sandboxTranspilation]);

  // Setup TypeScript environment.
  // "useMemo" instead of "useEffect" to call it right away on first render
  // and not wait until all children "useEffect" are called.
  useMemo(() => {
    const basePathPrefix = basePath.endsWith('/') ? basePath : `${basePath}/`;

    // @ts-ignore
    window.MonacoEnvironment = {
      getWorkerUrl: (moduleId: string, label: string): string => {
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

    // TODO: Allow user to configure compiler.

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
      typescript.typescriptDefaults.addExtraLib(code, filename);
    });

    // Re-enable type checking and syntax validation.
    typescript.typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: false,
      noSyntaxValidation: false
    });
  }, []);

  useEffect(() => {
    const { type, sandbox, code } = routerState.optionsControls;

    if (type === 'predefined') {
      const newSandboxSelected = findSandboxByPath(sandboxes, sandbox);

      if (newSandboxSelected) {
        if (newSandboxSelected !== sandboxSelected) {
          setSandboxSelected(newSandboxSelected);
        }

        const newSandboxCode = newSandboxSelected.code || '';
        editorModel.setValue(newSandboxCode);
      }
      // If it is type=predefined and the provided sandbox path is not found,
      // user is redirected to a custom sandbox since none can be visually shown.
      else {
        routerState.setOptions({
          type: 'custom',
          code: '// Custom sandbox...\n'
        });
        setSandboxSelected(null);
      }
    } else if (type === 'custom') {
      editorModel.setValue(code || '// Custom sandbox...\n');
      setSandboxSelected(null);
    }
  }, [routerState, sandboxes, sandboxSelected]);

  useEffect(() => {
    const onTranspile = (): void => {
      // If transpilation takes too long, show an empty preview meanwhile.
      setSandboxTranspilation({
        importsLines: [],
        code: '// NOT READY',
        error: ''
      });

      transpile(editorModel.model).then((compilation) => {
        setSandboxTranspilation(compilation);

        if (routerState.optionsControls.type === 'custom') {
          // A ref to the routerState is used to prevent a loop in updates.
          routerStateRef.current.setOptions({
            code: editorModel.getValue()
          });
        }

        // Still show the error in the console.
        if (compilation.error) {
          console.error(compilation.error);
        }
      });
    };

    const onChangeSubscription =
      editorModel.model.onDidChangeContent(onTranspile);

    // Transpile initial source code.
    onTranspile();

    return () => {
      onChangeSubscription.dispose();
    };
  }, [routerState.optionsControls.type]);

  useEffect(() => {
    const onResetPredefinedSandboxCode = (): void => {
      if (routerState.optionsControls.type === 'predefined') {
        const codeDefault = store.sandboxSelected?.code || '';
        editorModel.setValue(codeDefault);
      }
    };

    store.subscribe('resetPredefinedSandboxCode', onResetPredefinedSandboxCode);

    return () => {
      store.unsubscribe(
        'resetPredefinedSandboxCode',
        onResetPredefinedSandboxCode
      );
    };
  }, [routerState, store]);

  useEffect(() => {
    onSandboxChange?.(sandboxSelected);
  }, [sandboxSelected]);

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export { StoreProvider };
