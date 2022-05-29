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
  const [isSandboxesError, setIsSandboxesError] = useState(false);

  const [typeDefinitions, setTypeDefinitions] = useState<
    NTPlaygroundSettingsTypeDefinition[]
  >([]);
  const [isTypeDefinitionsLoading, setIsTypeDefinitionsLoading] =
    useState(true);
  const [isTypeDefinitionsError, setIsTypeDefinitionsError] = useState(false);

  const setup: NTPlaygroundSetup = useMemo(() => {
    return {
      playgroundPath: '/',
      sandboxPath: '/sandbox/',
      codeLanguage: 'javascript',
      editorCustomSandboxMsg:
        '// Select a sandbox in the explorer...\n// Or continue editing this custom sandbox...\n',

      sandboxes,
      isSandboxesLoading,
      isSandboxesError,

      typeDefinitions,
      isTypeDefinitionsLoading,
      isTypeDefinitionsError,
      ...(settings as Partial<NTPlaygroundSettings>),
      basePath: (settings.basePath || '').replace(/\/$/, '') || '/'
    };
  }, [
    settings,
    sandboxes,
    isSandboxesLoading,
    isSandboxesError,
    typeDefinitions,
    isTypeDefinitionsLoading,
    isTypeDefinitionsError
  ]);

  useEffect(() => {
    setIsSandboxesLoading(true);

    settings
      .getSandboxes()
      .then(setSandboxes)
      .catch(() => setIsSandboxesError(true))
      .finally(() => setIsSandboxesLoading(false));

    if (settings.getTypeDefinitions) {
      setIsTypeDefinitionsLoading(true);

      settings
        .getTypeDefinitions()
        .then(setTypeDefinitions)
        .catch(() => setIsTypeDefinitionsError(true))
        .finally(() => setIsTypeDefinitionsLoading(false));
    } else {
      setIsTypeDefinitionsLoading(false);
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
