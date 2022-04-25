import React, { ReactNode, ReactElement, useMemo } from 'react';

import type { NTPlaygroundSettings } from '../../../types';
import { PlaygroundSettingsContext } from '../../utils/PlaygroundSettingsContext';

interface PlaygroundSettingsProviderProps {
  settings: NTPlaygroundSettings;
  children: ReactNode;
}

const PlaygroundSettingsProvider = (
  props: PlaygroundSettingsProviderProps
): ReactElement => {
  const settings: NTPlaygroundSettings = useMemo(() => {
    return {
      playgroundPath: '/',
      sandboxPath: '/sandbox/',
      codeLanguage: 'javascript',
      typeDefinitions: [],
      sandboxes: [],
      editorCustomSandboxMsg:
        '// Select a sandbox or continue editing this custom one...\n',
      ...(props.settings as Partial<NTPlaygroundSettings>),
      basePath: (props.settings.basePath || '').replace(/\/$/, '') || '/'
    };
  }, [props.settings]);

  return (
    <PlaygroundSettingsContext.Provider value={settings}>
      {props.children}
    </PlaygroundSettingsContext.Provider>
  );
};

export type { PlaygroundSettingsProviderProps };
export { PlaygroundSettingsProvider };
