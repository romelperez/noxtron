import { createContext } from 'react';

import type { NTStore } from '../../../types';

const StoreContext = createContext<NTStore>(null as any);

export { StoreContext };
