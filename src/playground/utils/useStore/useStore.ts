import { useContext } from 'react';

import type { NTStore } from '../../../types';
import { StoreContext } from '../StoreContext';

const useStore = (): NTStore => {
  return useContext(StoreContext);
};

export { useStore };
