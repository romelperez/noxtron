import React, {
  ReactNode,
  ReactElement,
  useMemo,
  useState,
  useEffect
} from 'react';

import type {
  NTPlaygroundSettings,
  NTPlaygroundSettingsTypeDefinition,
  NTPlaygroundSetup,
  NTSandbox
} from '../../../types';
import { PlaygroundSetupContext } from '../../utils/PlaygroundSetupContext';

interface PlaygroundSetupProviderProps {
  settings: NTPlaygroundSettings;
  children: ReactNode;
}

const PlaygroundSetupProvider = (
  props: PlaygroundSetupProviderProps
): ReactElement => {
  const { settings, children } = props;

  const [sandboxes, setSandboxes] = useState<NTSandbox[]>([]);
  const [isSandboxesLoading, setIsSandboxesLoading] = useState(true);
  const [hasSandboxesError, setHasSandboxesError] = useState(false);

  const [typeDefinitions, setTypeDefinitions] = useState<
    NTPlaygroundSettingsTypeDefinition[]
  >([]);

  const setup: NTPlaygroundSetup = useMemo(() => {
    return {
      sandboxes,
      isSandboxesLoading,
      hasSandboxesError,
      typeDefinitions,
      playgroundPath: '/',
      sandboxPath: '/sandbox/',
      codeLanguage: 'javascript',
      editorCustomSandboxMsg:
        '// Select a sandbox in the explorer...\n// Or continue editing this custom sandbox...\n',
      ...(settings as Partial<NTPlaygroundSettings>),
      basePath: (settings.basePath || '').replace(/\/$/, '') || '/'
    };
  }, [
    settings,
    isSandboxesLoading,
    hasSandboxesError,
    sandboxes,
    typeDefinitions
  ]);

  useEffect(() => {
    setIsSandboxesLoading(true);

    settings
      .getSandboxes()
      .then((sandboxes) => {
        setSandboxes(sandboxes);
      })
      .catch(() => {
        setHasSandboxesError(true);
      })
      .finally(() => {
        setIsSandboxesLoading(false);
      });

    if (settings.getTypeDefinitions) {
      settings.getTypeDefinitions().then((typeDefinitions) => {
        setTypeDefinitions(typeDefinitions);
      });
    }
  }, []);

  return (
    <PlaygroundSetupContext.Provider value={setup}>
      {children}
    </PlaygroundSetupContext.Provider>
  );
};

export type { PlaygroundSetupProviderProps };
export { PlaygroundSetupProvider };
