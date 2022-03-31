import React, { ReactNode, ReactElement, useMemo } from 'react';

import type { NTUserConfig } from '../../../types';
import { UserConfigContext } from '../../utils/UserConfigContext';

interface StoreProviderProps {
  config: NTUserConfig;
  children: ReactNode;
}

const UserConfigProvider = (props: StoreProviderProps): ReactElement => {
  const config: NTUserConfig = useMemo(() => {
    return {
      playgroundPath: '/',
      sandboxPath: '/sandbox/',
      language: 'javascript',
      sandboxes: [],
      ...(props.config as Partial<NTUserConfig>),
      basePath: (props.config.basePath || '').replace(/\/$/, '') || '/'
    };
  }, [props.config]);

  return (
    <UserConfigContext.Provider value={config}>
      {props.children}
    </UserConfigContext.Provider>
  );
};

export { UserConfigProvider };
