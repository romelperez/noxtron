import { createContext } from 'react';

import type { NTPlaygroundSettings } from '../../../types';

const PlaygroundSettingsContext = createContext<NTPlaygroundSettings>(
  null as any
);

export { PlaygroundSettingsContext };
