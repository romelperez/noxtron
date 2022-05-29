import createStore from 'zustand';

import { NTStoreEvent, NTStoreSubscriber, NTStore } from '../../../types';

type StoreSubscriptions = {
  [event in NTStoreEvent]?: Set<NTStoreSubscriber>;
};

const subscriptions: StoreSubscriptions = {};

const useStore = createStore<NTStore>((set, get) => ({
  exploration: {
    isLoading: true,
    isError: false,
    sandboxes: [],
    sandboxSelected: null
  },
  editor: {
    isTypeDefinitionsLoading: true,
    isTypeDefinitionsError: false,
    typeDefinitions: [],
    model: null,
    getValue: () => {
      const { editor } = get();
      return editor.model ? editor.model.getValue() : '';
    },
    setValue: (code: string) => {
      const { editor } = get();
      if (editor.model && code !== editor.model.getValue()) {
        editor.model.setValue(code);
      }
    }
  },
  transpilation: {
    isLoading: true,
    importsLines: [],
    code: '// NOT READY',
    error: ''
  },
  updateExploration: (exploration) => {
    set({ exploration: { ...get().exploration, ...exploration } });
  },
  updateEditor: (editor) => {
    set({ editor: { ...get().editor, ...editor } });
  },
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
