import React, { ReactNode, ReactElement, useState, useEffect, useMemo } from 'react';
import ky from 'ky';

import type { StoreSandbox, Store } from '@src/types';
import { StoreContext } from '@src/utils/StoreContext';
import { useRouterState } from '@src/utils/useRouterState';
import { findSandboxByPath } from '@src/utils/findSandboxByPath';


interface WarehouseProviderProps {
  children: ReactNode
}

const StoreProvider = (props: WarehouseProviderProps): ReactElement => {
  const { children } = props;

  const routerState = useRouterState();

  const [sandboxes, setSandboxes] = useState <StoreSandbox[]>([]);
  const [sandboxSelected, setSandboxSelected] = useState<StoreSandbox | null>(null);
  const [sandboxCode, setSandboxCode] = useState('');

  useEffect(() => {
    ky
      .get('/play/sandboxes.json')
      .then<StoreSandbox[]>(response => response.json())
      .then(sandboxes => {
        setSandboxes(sandboxes);
      })
      // TODO: Show error in UI.
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!warehouse) {
      return;
    }

    const sandboxSelected = findSandboxByPath(warehouse.sandboxes, routerState.optionsControls.sandbox);

    if (sandboxSelected) {
      if (warehouse.sandboxSelected !== sandboxSelected) {
        setSandboxSelected(sandboxSelected);
      }
    }
    else if (routerState.optionsControls.type !== 'custom') {
      routerState.setOptions({ type: 'custom' });
    }
  }, [sandboxes, routerState.optionsControls.sandbox]);

  const warehouse: Store = useMemo(() => ({
    sandboxes,
    sandboxSelected,
    sandboxCode,
    setSandboxCode: (newCode: string) => {
      setSandboxCode(newCode);
    }
  }), [sandboxes, sandboxSelected, sandboxCode]);

  return (
    <StoreContext.Provider value={warehouse}>
      {children}
    </StoreContext.Provider>
  );
};

export { StoreProvider };
