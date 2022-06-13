import { merge } from 'effector';
import debounce from 'lodash/debounce';

import {
  convertLocationSearchToString,
  encodeURLParameter
} from '../../../utils';
import {
  findSandboxByPath,
  transpile,
  setModelValueAsSandboxSelected,
  copy,
  isolate
} from '../../utils';
import {
  $setup,
  $router,
  $dependencies,
  $sandboxSelected,
  $transpilation
} from '../../stores';
import {
  sendSetupState,
  sendRouterState,
  sendRoute,
  sendTranspile,
  sendSandbox,
  sendReset,
  sendCustomize,
  sendIsolate,
  sendCopy
} from '../../events';
import { loadDependencies } from '../../effects';

const integrate = (): void => {
  $setup.on(sendSetupState, (state, newState) => {
    const newSetup = { ...state, ...newState };

    const basePath = newSetup.basePath.endsWith('/')
      ? newSetup.basePath
      : `${newSetup.basePath}/`;

    const assetsPath = newSetup.assetsPath.endsWith('/')
      ? newSetup.assetsPath
      : `${newSetup.assetsPath}/`;

    return { ...newSetup, basePath, assetsPath };
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
    // Convert to primitive value so it can be compared.
    $router.map((state) => state.optionsControls.sandbox.join())
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

      sendSandbox(null);
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
};

export { integrate };
