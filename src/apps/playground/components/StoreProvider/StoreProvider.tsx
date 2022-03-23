import React, { ReactNode, ReactElement, useState, useEffect, useMemo, useRef } from 'react';
import ky from 'ky';

import type { StoreSandbox, StoreEvent, StoreSubscriber, Store } from '../../../types';
import { StoreContext } from '../../../utils/StoreContext';
import { useRouterState } from '../../../utils/useRouterState';
import { findSandboxByPath } from '../../../utils/findSandboxByPath';

type StoreSubscriptions = {
  [event in StoreEvent]?: Set<StoreSubscriber>
}

interface StoreProviderProps {
  children: ReactNode
}

const StoreProvider = (props: StoreProviderProps): ReactElement => {
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

    const { type, sandbox, code } = routerState.optionsControls;
    const newSandboxSelected = findSandboxByPath(sandboxes, sandbox);

    if (newSandboxSelected) {
      if (newSandboxSelected !== sandboxSelected) {
        setSandboxSelected(newSandboxSelected);
      }

      if (type === 'predefined') {
        setSandboxCode(newSandboxSelected.code || '');
      }
    }
    else if (type !== 'custom') {
      routerState.setOptions({ type: 'custom' });
    }

    if (type === 'custom') {
      setSandboxCode(code);
    }
  }, [routerState, sandboxes, sandboxSelected]);

  const store = useMemo(() => {
    const store: Store = {
      sandboxes,
      sandboxSelected,
      sandboxCode,
      setSandboxCode: (newCode: string = '') => {
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

  useEffect(() => {
    // TODO: This will not work until a proper code management is implemented.
    const onResetPredefinedSandboxCode = (): void => {
      if (routerState.optionsControls.type === 'predefined') {
        store.setSandboxCode(store?.sandboxSelected?.code || '');
      }
    };

    store.subscribe('resetPredefinedSandboxCode', onResetPredefinedSandboxCode);

    return () => {
      store.unsubscribe('resetPredefinedSandboxCode', onResetPredefinedSandboxCode);
    };
  }, [routerState, store]);

  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  );
};

export { StoreProvider };
