import { useContext } from 'react';

import type { Store } from '@src/types';
import { StoreContext } from '@src/utils/StoreContext';

const useStore = (): Store => {
  return useContext(StoreContext);
};

export { useStore };
