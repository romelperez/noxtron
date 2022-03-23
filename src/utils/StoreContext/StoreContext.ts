import { createContext } from 'react';

import type { Store } from '@src/types';

const StoreContext = createContext<Store | null>(null);

export { StoreContext };
