import { createContext } from 'react';

import type { NTPlaygroundSettings } from '../../../types';

const UserConfigContext = createContext<NTPlaygroundSettings>(null as any);

export { UserConfigContext };
