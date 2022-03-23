import { createContext } from 'react';

import type { Store } from '@src/types';

const StoreContext = createContext<Store>(null as any);

export { StoreContext };
