import { createContext } from 'react';

import type { NTUserConfig } from '../../../types';

const UserConfigContext = createContext<NTUserConfig>(null as any);

export { UserConfigContext };
