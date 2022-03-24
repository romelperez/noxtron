import React, {
  ReactNode,
  ReactElement,
  useState,
  useEffect,
  useMemo,
  useRef
} from 'react';

import type {
  Sandbox,
  StoreEvent,
  StoreSubscriber,
  Store
} from '../../../types';
import { StoreContext } from '../../../utils/StoreContext';
import { useRouterState } from '../../../utils/useRouterState';
import { getUserGlobalSandboxes } from '../../../utils/getUserGlobalSandboxes';
import { findSandboxByPath } from '../../../utils/findSandboxByPath';

type StoreSubscriptions = {
  [event in StoreEvent]?: Set<StoreSubscriber>;
};

interface StoreProviderProps {
  children: ReactNode;
}

const StoreProvider = (props: StoreProviderProps): ReactElement => {
  const { children } = props;

  const routerState = useRouterState();

  const [sandboxSelected, setSandboxSelected] = useState<Sandbox | null>(null);
  const [sandboxCode, setSandboxCode] = useState('');

  const subscriptionsRef = useRef<StoreSubscriptions>({});

  const sandboxes = getUserGlobalSandboxes();

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
    } else if (type !== 'custom') {
      routerState.setOptions({ type: 'custom' });
    }

    if (type === 'custom') {
      setSandboxCode(code);
    }
  }, [routerState, sandboxes, sandboxSelected]);

  const store = useMemo(() => {
    const store: Store = {
      sandboxSelected,
      sandboxCode,
      setSandboxCode: (newCode: string = '') => {
        if (routerState.optionsControls.type === 'predefined') {
          setSandboxCode(newCode);
        } else {
          routerState.setOptions({ code: newCode });
        }
      },
      subscribe: (event, subscriber) => {
        subscriptionsRef.current[event] =
          subscriptionsRef.current[event] || new Set();
        subscriptionsRef.current[event]?.add(subscriber);
      },
      unsubscribe: (event, subscriber) => {
        subscriptionsRef.current[event]?.delete(subscriber);
      },
      trigger: (event) => {
        subscriptionsRef.current[event]?.forEach((subscribe) => subscribe());
      }
    };
    return store;
  }, [routerState, sandboxes, sandboxSelected, sandboxCode]);

  useEffect(() => {
    const onResetPredefinedSandboxCode = (): void => {
      if (routerState.optionsControls.type === 'predefined') {
        store.setSandboxCode(store.sandboxSelected?.code || '');
      }
    };

    store.subscribe('resetPredefinedSandboxCode', onResetPredefinedSandboxCode);

    return () => {
      store.unsubscribe(
        'resetPredefinedSandboxCode',
        onResetPredefinedSandboxCode
      );
    };
  }, [routerState, store]);

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export { StoreProvider };
