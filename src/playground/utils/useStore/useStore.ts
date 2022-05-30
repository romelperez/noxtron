import createStore from 'zustand';

import { NTStoreEvent, NTStoreSubscriber, NTStore } from '../../../types';

type StoreSubscriptions = {
  [event in NTStoreEvent]?: Set<NTStoreSubscriber>;
};

const subscriptions: StoreSubscriptions = {};

const useStore = createStore<NTStore>((set, get) => ({
  isLoading: true,
  error: '',

  // Store will not be available to components until these dependencies are resolved.
  monaco: null as any,
  model: null as any,

  typeDefinitions: [],
  sandboxes: [],
  sandboxSelected: null,
  transpilation: {
    isLoading: true,
    importsLines: [],
    code: '// NOT READY',
    error: ''
  },

  setStatus: (status) => set({ ...get(), ...status }),
  setDependencies: ({ monaco, model, sandboxes, typeDefinitions }) =>
    set({ monaco, model, sandboxes, typeDefinitions }),
  setSandboxSelected: (sandboxSelected) => set({ sandboxSelected }),
  updateTranspilation: (transpilation) => {
    set({ transpilation: { ...get().transpilation, ...transpilation } });
  },

  subscribe: (event, subscriber) => {
    subscriptions[event] = subscriptions[event] || new Set();
    subscriptions[event]?.add(subscriber);
  },
  unsubscribe: (event, subscriber) => {
    subscriptions[event]?.delete(subscriber);
  },
  trigger: (event) => {
    subscriptions[event]?.forEach((subscribe) => subscribe());
  }
}));

export { useStore };
