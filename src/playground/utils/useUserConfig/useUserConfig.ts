import { useContext } from 'react';

import type { NTPlaygroundSettings } from '../../../types';
import { UserConfigContext } from '../UserConfigContext';

const useUserConfig = (): NTPlaygroundSettings => {
  return useContext(UserConfigContext);
};

export { useUserConfig };
