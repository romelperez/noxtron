import { createContext } from 'react';

import type { NTRouterState } from '../../../types';

const RouterStateContext = createContext<NTRouterState>(null as any);

export { RouterStateContext };
