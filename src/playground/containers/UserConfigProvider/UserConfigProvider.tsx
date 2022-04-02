import React, { ReactNode, ReactElement, useMemo } from 'react';

import type { NTPlaygroundSettings } from '../../../types';
import { UserConfigContext } from '../../utils/UserConfigContext';

interface StoreProviderProps {
  config: NTPlaygroundSettings;
  children: ReactNode;
}

const UserConfigProvider = (props: StoreProviderProps): ReactElement => {
  const config: NTPlaygroundSettings = useMemo(() => {
    return {
      playgroundPath: '/',
      sandboxPath: '/sandbox/',
      language: 'javascript',
      typeDefinitions: [],
      sandboxes: [],
      ...(props.config as Partial<NTPlaygroundSettings>),
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
