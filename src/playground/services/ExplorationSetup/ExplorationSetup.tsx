import React, { ReactElement, useEffect } from 'react';

import {
  useRouterState,
  usePlaygroundSettings,
  findSandboxByPath
} from '../../utils';
import { useStore } from '../../services';

const ExplorationSetup = (): ReactElement => {
  const settings = usePlaygroundSettings();
  const routerState = useRouterState();
  const sandboxes = useStore((state) => state.sandboxes);
  const sandboxSelected = useStore((state) => state.sandboxSelected);
  const setSandboxSelected = useStore((state) => state.setSandboxSelected);
  const model = useStore((state) => state.model);
  const subscribe = useStore((state) => state.subscribe);
  const unsubscribe = useStore((state) => state.unsubscribe);

  // Setup predefined sandbox.
  useEffect(() => {
    const { newCustomSandboxCode } = settings;
    const { type, sandbox: sandboxPath } = routerState.optionsControls;

    if (type === 'predefined') {
      const newSandboxSelected = findSandboxByPath(sandboxes, sandboxPath);

      if (newSandboxSelected) {
        if (newSandboxSelected !== sandboxSelected) {
          setSandboxSelected(newSandboxSelected);
        }
      } else {
        setSandboxSelected(null);
        routerState.setOptions({
          type: 'custom',
          code: newCustomSandboxCode
        });
      }
    }
  }, [routerState.optionsControls.type, routerState.optionsControls.sandbox]);

  // Setup predefined sandbox events.
  useEffect(() => {
    const { type } = routerState.optionsControls;

    const onResetPredefinedSandboxCode = (): void => {
      if (type === 'predefined') {
        const codeDefault = sandboxSelected?.code || '';
        model.setValue(codeDefault);
      }
    };

    subscribe('resetPredefinedSandboxCode', onResetPredefinedSandboxCode);

    return () => {
      unsubscribe('resetPredefinedSandboxCode', onResetPredefinedSandboxCode);
    };
  }, [routerState.optionsControls.type, sandboxSelected]);

  // Trigger on sandbox change event.
  useEffect(() => {
    const { onSandboxChange } = settings;
    onSandboxChange?.(sandboxSelected);
  }, [settings.onSandboxChange, sandboxSelected]);

  return <></>;
};

export { ExplorationSetup };
