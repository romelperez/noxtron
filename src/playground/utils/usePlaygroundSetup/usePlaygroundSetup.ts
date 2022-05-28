import { useContext } from 'react';

import type { NTPlaygroundSetup } from '../../../types';
import { PlaygroundSetupContext } from '../PlaygroundSetupContext';

const usePlaygroundSetup = (): NTPlaygroundSetup => {
  return useContext(PlaygroundSetupContext);
};

export { usePlaygroundSetup };
