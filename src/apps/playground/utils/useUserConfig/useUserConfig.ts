import { useContext } from 'react';

import type { NTUserConfig } from '../../../types';
import { UserConfigContext } from '../UserConfigContext';

const useUserConfig = (): NTUserConfig => {
  return useContext(UserConfigContext);
};

export { useUserConfig };
