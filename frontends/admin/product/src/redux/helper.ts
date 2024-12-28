import { inject, computed } from 'vue';
import { store, RootState } from 'store/Store';
import { storeKey } from './storePlugin';

export const useDispath = () => store.dispatch;

export const useSelector = <
  State extends ReturnType<typeof store.getState> = ReturnType<
    typeof store.getState
  >
>(
  fn: (state: State) => State[keyof State]
) => {
  const rootStore = inject(storeKey) as {
    state: ReturnType<typeof store.getState>;
  };
  return computed(() => fn(rootStore.state as State));
};
