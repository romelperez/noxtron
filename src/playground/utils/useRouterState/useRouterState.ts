import { useContext } from 'react';

import type { NTRouterState } from '../../../types';
import { RouterStateContext } from '../RouterStateContext';

const useRouterState = (): NTRouterState => {
  return useContext(RouterStateContext);
};

export { useRouterState };
