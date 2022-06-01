import React, { ReactElement, useEffect, useRef } from 'react';
import debounce from 'lodash/debounce';

import { useRouterState } from '../../utils/useRouterState';
import { usePlaygroundSettings } from '../../utils/usePlaygroundSettings';
import { useStore } from '../../utils/useStore';
import { transpile } from '../../utils/transpile';

const TranspilationSetup = (): ReactElement => {
  const settings = usePlaygroundSettings();
  const routerState = useRouterState();
  const monaco = useStore((state) => state.monaco);
  const model = useStore((state) => state.model);
  const updateTranspilation = useStore((state) => state.updateTranspilation);

  const routerStateRef = useRef(routerState);
  routerStateRef.current = routerState;

  useEffect(() => {
    const { newCustomSandboxCode } = settings;
    const { type } = routerState.optionsControls;

    const setTranspilationProcessingState = (): void => {
      const isEditorUnchanged = model.getValue() !== newCustomSandboxCode;
      updateTranspilation({
        isLoading: isEditorUnchanged,
        importsLines: [],
        code: '//',
        error: ''
      });
    };

    const onTranspile = (): void => {
      setTranspilationProcessingState();

      transpile(monaco.languages.typescript, model).then((compilation) => {
        updateTranspilation(compilation);

        if (type === 'custom') {
          // A ref to the routerState is used to prevent a loop in updates.
          routerStateRef.current.setOptions({
            code: model.getValue()
          });
        }

        // Still show the error in the console.
        if (compilation.error) {
          console.error(compilation.error);
        }
      });
    };

    const onTranspileDebounce = debounce(onTranspile, 500);
    const onChangeSubscription = model.onDidChangeContent(() => {
      setTranspilationProcessingState();
      onTranspileDebounce();
    });

    // Transpile initial source code.
    onTranspile();

    return () => {
      onChangeSubscription.dispose();
    };
  }, [routerState.optionsControls.type]);

  return <></>;
};

export { TranspilationSetup };
