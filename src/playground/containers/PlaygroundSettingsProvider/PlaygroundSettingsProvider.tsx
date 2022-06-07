import React, { ReactNode, ReactElement, useMemo } from 'react';

import type { NTPlaygroundSettings } from '../../../types';
import { PlaygroundSettingsContext } from '../../utils';

interface PlaygroundSettingsProviderProps {
  settings: NTPlaygroundSettings;
  children: ReactNode;
}

const settingsDefault: Partial<NTPlaygroundSettings> = {
  assetsPath: '/',
  playgroundPath: '/',
  sandboxPath: '/sandbox/',
  codeLanguage: 'javascript',
  newCustomSandboxCode: [
    '// Select a sandbox in the explorer...\n',
    '// Or continue editing this custom sandbox...\n'
  ].join(''),
  newCustomSandboxMessage: 'Select a sandbox or edit the code.'
};

const PlaygroundSettingsProvider = (
  props: PlaygroundSettingsProviderProps
): ReactElement => {
  const { settings, children } = props;

  const settingsProvided: NTPlaygroundSettings = useMemo(() => {
    return {
      ...settingsDefault,
      ...settings,
      basePath: (settings.basePath || '').replace(/\/$/, '') || '/'
    };
  }, [settings]);

  return (
    <PlaygroundSettingsContext.Provider value={settingsProvided}>
      {children}
    </PlaygroundSettingsContext.Provider>
  );
};

export type { PlaygroundSettingsProviderProps };
export { PlaygroundSettingsProvider };
