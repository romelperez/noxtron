import { useContext } from 'react';

import type { Store } from '../../types';
import { StoreContext } from '../../utils/StoreContext';

const useStore = (): Store => {
  return useContext(StoreContext);
};

export { useStore };
