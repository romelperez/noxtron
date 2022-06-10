import { createStore, createEvent, createEffect, merge } from 'effector';
import debounce from 'lodash/debounce';

import {
  NTMonaco,
  NTMonacoModel,
  NTMonacoCompilerOptions,
  NTRouterOptionsUpdate,
  NTSandbox,
  NTTypeDefinition,
  NTSetup,
  NTStoreSetup,
  NTStoreRouter,
  NTStoreDependencies,
  NTStoreSandboxSelected,
  NTStoreTranspilation,
  NTAppPlaygroundSettings
} from '../../types';
import { findSandboxByPath, transpile } from '../utils';
import { convertLocationSearchToString, encodeURLParameter } from '../../utils';

//
// STORES
//

export const $setup = createStore<NTStoreSetup>({
  basePath: '/',
  assetsPath: '/',
  playgroundPath: '/',
  sandboxPath: '/',
  codeLanguage: 'javascript',
  newCustomSandboxCode: [
    '// Select a sandbox in the explorer...\n',
    '// Or continue editing this custom sandbox...\n'
  ].join(''),
  newCustomSandboxMessage: 'Select a sandbox or edit the code.',
  theme: {},
  title: {},
  header: {},
  toolbar: {},
  links: {},
  getMonaco: () => null as any,
  getSandboxes: () => []
});

export const $router = createStore<NTStoreRouter>({
  options: {
    type: undefined,
    sandbox: undefined,
    code: undefined,
    explorer: undefined,
    editor: undefined,
    preview: undefined,
    dark: undefined
  },
  optionsControls: {
    type: 'custom',
    sandbox: [],
    code: ''
  },
  optionsBooleans: {
    explorer: false,
    editor: false,
    preview: false,
    dark: false
  }
});

export const $dependencies = createStore<NTStoreDependencies>({
  isLoading: true,
  error: '',
  // The dependencies will be used only when they are loaded.
  monaco: null as any,
  model: null as any,
  sandboxes: [],
  typeDefinitions: []
});

export const $sandboxSelected = createStore<NTStoreSandboxSelected>(null);

export const $transpilation = createStore<NTStoreTranspilation>({
  isLoading: false,
  code: '// NOT READY',
  importsLines: [],
  error: '',
  sandboxURLParams: ''
});

//
// EVENTS
//

export const sendSetupState =
  createEvent<NTAppPlaygroundSettings>('sendSetupState');

export const sendLoad = createEvent('sendLoad');

export const sendRouterState = createEvent<NTStoreRouter>('sendRouterState');

export const sendRoute = createEvent<NTRouterOptionsUpdate>('sendRoute');

export const sendTranspile =
  createEvent<Partial<NTStoreTranspilation>>('sendTranspile');

export const sendSandbox = createEvent<NTSandbox | null>('sendSandbox');

export const sendReload = createEvent('sendReload');

export const sendReset = createEvent('sendReset');

export const sendCustomize = createEvent('sendCustomize');

export const sendIsolate = createEvent('sendIsolate');

export const sendCopy = createEvent('sendCopy');

//
// SIDE EFFECTS
//

const setupMonacoEnvironment = (setup: NTSetup) => {
  const { assetsPath } = setup;
  const assetsPathPrefix = assetsPath.endsWith('/')
    ? assetsPath
    : `${assetsPath}/`;

  // @ts-ignore
  window.MonacoEnvironment = {
    getWorkerUrl: (moduleId: string, label: string): string => {
      if (label === 'typescript' || label === 'javascript') {
        return `${assetsPathPrefix}ts.worker.js`;
      }
      return `${assetsPathPrefix}editor.worker.js`;
    }
  };
};

const setupMonacoCompilers = (
  monaco: NTMonaco,
  typeDefinitions: NTTypeDefinition[]
) => {
  const { typescript } = monaco.languages;

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
    monaco.languages.typescript.typescriptDefaults.addExtraLib(code, filename);
  });

  // Re-enable type checking and syntax validation.
  typescript.typescriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: false,
    noSyntaxValidation: false
  });
};

const setModelValueAsSandboxSelected = (
  model: NTMonacoModel,
  sandboxSelected: NTSandbox | null
): void => {
  if (sandboxSelected) {
    const baseCode = sandboxSelected.code || '';
    if (baseCode !== model.getValue()) {
      model.setValue(baseCode);
    }
  }
};

const copy = (model: NTMonacoModel) => {
  window.navigator.clipboard.writeText(model.getValue());
};

const isolate = (url: string) => {
  window.open(`${window.location.origin}${url}`, 'sandbox');
};

//
// EFFECTS
//

export const loadDependencies = createEffect(() => {
  const setup = $setup.getState();
  const { getMonaco, getSandboxes, getTypeDefinitions, codeLanguage } = setup;

  setupMonacoEnvironment(setup);

  return Promise.all(
    [getMonaco(), getSandboxes(), getTypeDefinitions?.()].filter(Boolean)
  ).then((dependencies) => {
    const monaco = dependencies[0] as NTMonaco;
    const sandboxes = dependencies[1] as NTSandbox[];
    const typeDefinitions = (dependencies[2] || []) as NTTypeDefinition[];

    const codeInitial = '';
    const filename = monaco.Uri.parse(
      codeLanguage === 'typescript' ? 'sandbox.tsx' : 'sandbox.jsx'
    );
    const model: NTMonacoModel = monaco.editor.createModel(
      codeInitial,
      codeLanguage,
      filename
    );

    setupMonacoCompilers(monaco, typeDefinitions);

    return {
      monaco,
      model,
      sandboxes,
      typeDefinitions
    };
  });
});

//
// TRANSITIONS
//

$setup.on(sendSetupState, (state, newState) => {
  const newSetup = { ...state, ...newState };
  const basePath = (newSetup.basePath || '').replace(/\/$/, '') || '/';
  return { ...newSetup, basePath };
});

$router.on(sendRouterState, (state, newState) => ({ ...state, ...newState }));

$dependencies.on(loadDependencies.doneData, (state, dynamicDependencies) => ({
  ...state,
  ...dynamicDependencies,
  isLoading: false,
  error: ''
}));

$dependencies.on(loadDependencies.failData, (state, err) => ({
  ...state,
  isLoading: false,
  error: err instanceof Error ? err.message : 'Error loading dependencies.'
}));

$dependencies.on(sendCopy, ({ model }) => {
  copy(model);
});

$sandboxSelected.on(
  sendSandbox,
  (state, newSandboxSelected) => newSandboxSelected
);

$sandboxSelected.watch(() => {
  const setup = $setup.getState();
  const { model } = $dependencies.getState();
  const sandboxSelected = $sandboxSelected.getState();

  setModelValueAsSandboxSelected(model, sandboxSelected);
  setup.onSandboxChange?.(sandboxSelected);
});

$transpilation.on(sendIsolate, ({ sandboxURLParams }) => {
  const { sandboxPath } = $setup.getState();
  isolate(`${sandboxPath}?${sandboxURLParams}`);
});

$transpilation.on(sendTranspile, (state, newState) => {
  const newTranspilation = { ...state, ...newState };

  const { importsLines, code, error } = newTranspilation;
  newTranspilation.sandboxURLParams = convertLocationSearchToString({
    importsLines: encodeURLParameter(JSON.stringify(importsLines)),
    code: encodeURLParameter(code),
    error: encodeURLParameter(error)
  });

  return newTranspilation;
});

sendReset.watch(() => {
  const { model } = $dependencies.getState();
  const sandboxSelected = $sandboxSelected.getState();
  setModelValueAsSandboxSelected(model, sandboxSelected);
});

sendCustomize.watch(() => {
  const { model } = $dependencies.getState();
  const sandboxSelected = $sandboxSelected.getState();

  if (sandboxSelected) {
    sendRoute({
      type: 'custom',
      code: model.getValue()
    });
  }
});

merge([
  loadDependencies.done,
  $router.map((state) => state.optionsControls.type),
  $router.map((state) => state.optionsControls.sandbox)
]).watch(() => {
  const { optionsControls } = $router.getState();
  const { isLoading, error, sandboxes } = $dependencies.getState();

  if (!isLoading && !error && optionsControls.type === 'predefined') {
    const { newCustomSandboxCode } = $setup.getState();
    const sandboxSelected = $sandboxSelected.getState();

    const newSandboxSelected = findSandboxByPath(
      sandboxes,
      optionsControls.sandbox
    );

    if (newSandboxSelected) {
      if (newSandboxSelected !== sandboxSelected) {
        sendSandbox(newSandboxSelected);
      }
    } else {
      sendSandbox(null);
      sendRoute({
        type: 'custom',
        code: newCustomSandboxCode
      });
    }
  }
});

merge([
  loadDependencies.done,
  $router.map((state) => state.optionsControls.type),
  $router.map((state) => state.optionsControls.code)
]).watch(() => {
  const { optionsControls } = $router.getState();
  const { isLoading, error, model } = $dependencies.getState();

  if (!isLoading && !error && optionsControls.type === 'custom') {
    const { newCustomSandboxCode } = $setup.getState();

    const currentCode =
      optionsControls.code || (newCustomSandboxCode as string);

    if (model.getValue() !== currentCode) {
      model.setValue(currentCode);
    }
  }
});

loadDependencies.done.watch(() => {
  const { newCustomSandboxCode } = $setup.getState();
  const { monaco, model } = $dependencies.getState();

  const setTranspilationProcessingState = (): void => {
    const isEditorUnchanged = model.getValue() !== newCustomSandboxCode;
    sendTranspile({
      isLoading: isEditorUnchanged,
      importsLines: [],
      code: '//',
      error: ''
    });
  };

  const onTranspile = (): void => {
    setTranspilationProcessingState();

    transpile(monaco.languages.typescript, model).then((transpilation) => {
      const { optionsControls } = $router.getState();

      sendTranspile({
        ...transpilation,
        isLoading: false
      });

      if (optionsControls.type === 'custom') {
        sendRoute({
          code: model.getValue()
        });
      }

      // Still show the error in the console.
      if (transpilation.error) {
        console.error(transpilation.error);
      }
    });
  };

  const onTranspileDebounce = debounce(onTranspile, 500);

  model.onDidChangeContent(() => {
    setTranspilationProcessingState();
    onTranspileDebounce();
  });

  // Transpile initial source code.
  onTranspile();
});
