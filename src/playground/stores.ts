import { createStore } from 'effector';

import {
  NTStoreSetup,
  NTStoreRouter,
  NTStoreDependencies,
  NTStoreSandboxSelected,
  NTStoreTranspilation
} from '../types';

export const $setup = createStore<NTStoreSetup>({
  element: null as any,
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
