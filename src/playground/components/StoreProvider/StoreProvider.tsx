import React, { ReactNode, ReactElement, useState, useEffect, useMemo, useRef } from 'react';
import ky from 'ky';

import type { StoreSandbox, StoreEvent, StoreSubscriber, Store } from '@src/types';
import { StoreContext } from '@src/utils/StoreContext';
import { useRouterState } from '@src/utils/useRouterState';
import { findSandboxByPath } from '@src/utils/findSandboxByPath';

type StoreSubscriptions = {
  [event in StoreEvent]?: Set<StoreSubscriber>
}

interface WarehouseProviderProps {
  children: ReactNode
}

const StoreProvider = (props: WarehouseProviderProps): ReactElement => {
  const { children } = props;

  const routerState = useRouterState();

  const [sandboxes, setSandboxes] = useState <StoreSandbox[]>([]);
  const [sandboxSelected, setSandboxSelected] = useState<StoreSandbox | null>(null);
  const [sandboxCode, setSandboxCode] = useState('');

  const subscriptionsRef = useRef<StoreSubscriptions>({});

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
    if (!sandboxes.length) {
      return;
    }

    const sandboxSelected = findSandboxByPath(sandboxes, routerState.optionsControls.sandbox);

    if (sandboxSelected) {
      if (store.sandboxSelected !== sandboxSelected) {
        setSandboxSelected(sandboxSelected);
      }
    }
    else if (routerState.optionsControls.type !== 'custom') {
      routerState.setOptions({ type: 'custom' });
    }
  }, [sandboxes, routerState.optionsControls.sandbox]);

  const store = useMemo(() => {
    const store: Store = {
      sandboxes,
      sandboxSelected,
      sandboxCode,
      setSandboxCode: (newCode: string) => {
        setSandboxCode(newCode);
      },
      subscribe: (event, subscriber) => {
        subscriptionsRef.current[event] = subscriptionsRef.current[event] || new Set();
        subscriptionsRef.current[event]?.add(subscriber);
      },
      unsubscribe: (event, subscriber) => {
        subscriptionsRef.current[event]?.delete(subscriber);
      },
      trigger: event => {
        subscriptionsRef.current[event]?.forEach(subscribe => subscribe());
      }
    };
    return store;
  }, [sandboxes, sandboxSelected, sandboxCode]);

  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  );
};

export { StoreProvider };
