import { useContext } from 'react';

import type { NTPlaygroundSettings } from '../../../types';
import { PlaygroundSettingsContext } from '../PlaygroundSettingsContext';

const usePlaygroundSettings = (): NTPlaygroundSettings => {
  return useContext(PlaygroundSettingsContext);
};

export { usePlaygroundSettings };
