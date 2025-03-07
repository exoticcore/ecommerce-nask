import { App, inject, reactive, computed } from 'vue';
import { EnhancedStore } from '@reduxjs/toolkit';

export const storeKey = Symbol('Redux-Store');

export const createRedux = (store: EnhancedStore) => {
  type RootState = ReturnType<typeof store.getState>;
  const rootStore = reactive<{ state: RootState }>({
    state: store.getState(),
  });
  const plugin = {
    install: (app: App) => {
      app.provide<{ state: RootState }>(storeKey, rootStore);

      store.subscribe(() => {
        rootStore.state = store.getState();
      });
    },
  };
  return plugin;
};
