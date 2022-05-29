import React, { ReactElement, useEffect, useRef } from 'react';
import debounce from 'lodash/debounce';

import { NTMonacoModel } from '../../../types';
import { useRouterState } from '../../utils/useRouterState';
import { usePlaygroundSettings } from '../../utils/usePlaygroundSettings';
import { useStore } from '../../utils/useStore';
import { transpile } from '../../utils/transpile';

const TranspilationSetup = (): ReactElement => {
  const settings = usePlaygroundSettings();
  const routerState = useRouterState();
  const editor = useStore((state) => state.editor);
  const updateTranspilation = useStore((state) => state.updateTranspilation);

  const routerStateRef = useRef(routerState);
  routerStateRef.current = routerState;

  useEffect(() => {
    if (!editor.model) {
      return;
    }

    const { editorCustomSandboxMsg } = settings;
    const { type } = routerState.optionsControls;
    const model: NTMonacoModel = editor.model as unknown as NTMonacoModel;

    const setTranspilationProcessingState = (): void => {
      const isEditorEmpty = editor.getValue() !== editorCustomSandboxMsg;
      updateTranspilation({
        isLoading: isEditorEmpty,
        importsLines: [],
        code: '//',
        error: ''
      });
    };

    const onTranspile = (): void => {
      setTranspilationProcessingState();

      transpile(model).then((compilation) => {
        updateTranspilation(compilation);

        if (type === 'custom') {
          // A ref to the routerState is used to prevent a loop in updates.
          routerStateRef.current.setOptions({
            code: editor.getValue()
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
  }, [routerState.optionsControls.type, editor.model]);

  return <></>;
};

export { TranspilationSetup };
