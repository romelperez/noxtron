import { createContext } from 'react';

import type { Store } from '../../types';

const StoreContext = createContext<Store>(null as any);

export { StoreContext };
