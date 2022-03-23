import { useContext } from 'react';

import type { Store } from '@src/apps/types';
import { StoreContext } from '@src/apps/utils/StoreContext';

const useStore = (): Store => {
  return useContext(StoreContext);
};

export { useStore };
