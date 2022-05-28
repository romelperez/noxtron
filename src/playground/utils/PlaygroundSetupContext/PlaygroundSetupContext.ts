import { createContext } from 'react';

import type { NTPlaygroundSetup } from '../../../types';

const PlaygroundSetupContext = createContext<NTPlaygroundSetup>(null as any);

export { PlaygroundSetupContext };
