import React, { ReactElement, useEffect } from 'react';

import { useRouterState } from '../../utils/useRouterState';
import { usePlaygroundSettings } from '../../utils/usePlaygroundSettings';
import { useStore } from '../../utils/useStore';
import { findSandboxByPath } from '../../utils/findSandboxByPath';

const ExplorationSetup = (): ReactElement => {
  const settings = usePlaygroundSettings();
  const routerState = useRouterState();
  const exploration = useStore((state) => state.exploration);
  const editor = useStore((state) => state.editor);
  const updateExploration = useStore((state) => state.updateExploration);
  const subscribe = useStore((state) => state.subscribe);
  const unsubscribe = useStore((state) => state.unsubscribe);

  useEffect(() => {
    const { getSandboxes } = settings;

    updateExploration({ isLoading: true });

    Promise.resolve()
      .then(() => getSandboxes())
      .then((sandboxes) => updateExploration({ sandboxes }))
      .catch(() => updateExploration({ isError: true }))
      .finally(() => updateExploration({ isLoading: false }));
  }, []);

  useEffect(() => {
    const { editorCustomSandboxMsg } = settings;
    const { type, sandbox: sandboxPath } = routerState.optionsControls;
    const { isLoading, sandboxes, sandboxSelected } = exploration;

    if (isLoading) {
      return;
    }

    if (type === 'predefined') {
      const newSandboxSelected = findSandboxByPath(sandboxes, sandboxPath);

      if (newSandboxSelected) {
        if (newSandboxSelected !== sandboxSelected) {
          updateExploration({
            isLoading: false,
            sandboxSelected: newSandboxSelected
          });
        }
      } else {
        updateExploration({ isLoading: false, sandboxSelected: null });
        routerState.setOptions({
          type: 'custom',
          code: editorCustomSandboxMsg
        });
      }
    }
  }, [
    routerState.optionsControls.type,
    routerState.optionsControls.sandbox,
    exploration.isLoading
  ]);

  useEffect(() => {
    const { type } = routerState.optionsControls;
    const { sandboxSelected } = exploration;

    const onResetPredefinedSandboxCode = (): void => {
      if (type === 'predefined') {
        const codeDefault = sandboxSelected?.code || '';
        editor.setValue(codeDefault);
      }
    };

    subscribe('resetPredefinedSandboxCode', onResetPredefinedSandboxCode);

    return () => {
      unsubscribe('resetPredefinedSandboxCode', onResetPredefinedSandboxCode);
    };
  }, [routerState.optionsControls.type, exploration.sandboxSelected]);

  useEffect(() => {
    const { onSandboxChange } = settings;
    onSandboxChange?.(exploration.sandboxSelected);
  }, [settings.onSandboxChange, exploration.sandboxSelected]);

  return <></>;
};

export { ExplorationSetup };
