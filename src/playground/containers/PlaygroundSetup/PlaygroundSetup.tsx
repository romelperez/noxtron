import React, { ReactElement, useEffect } from 'react';

import {
  NTMonaco,
  NTSandbox,
  NTPlaygroundSettingsTypeDefinition
} from '../../../types';
import { usePlaygroundSettings } from '../../utils/usePlaygroundSettings';
import { useStore } from '../../utils/useStore';
import { ExplorationSetup } from '../ExplorationSetup';
import { EditorSetup } from '../EditorSetup';
import { TranspilationSetup } from '../TranspilationSetup';

const PlaygroundSetup = (): ReactElement => {
  const settings = usePlaygroundSettings();
  const setStatus = useStore((state) => state.setStatus);
  const setDependencies = useStore((state) => state.setDependencies);
  const isLoading = useStore((state) => state.isLoading);

  useEffect(() => {
    setStatus({ isLoading: true });

    Promise.all(
      [
        settings.getMonaco(),
        settings.getSandboxes(),
        settings.getTypeDefinitions?.()
      ].filter(Boolean)
    )
      .then(([monacoDependency, sandboxes, typeDefinitions = []]) => {
        const monaco = monacoDependency as NTMonaco;

        const { codeLanguage } = settings;
        const codeInitial = '';
        const filename = monaco.Uri.parse(
          codeLanguage === 'typescript' ? 'sandbox.tsx' : 'sandbox.jsx'
        );
        const model = monaco.editor.createModel(
          codeInitial,
          codeLanguage,
          filename
        );

        setDependencies({
          monaco,
          model,
          sandboxes: sandboxes as NTSandbox[],
          typeDefinitions:
            typeDefinitions as NTPlaygroundSettingsTypeDefinition[]
        });
      })
      .catch((ex) => {
        const defaultMsg = 'Error loading dependencies.';
        const msg = ex instanceof Error ? ex.message : defaultMsg;
        setStatus({ error: msg });
      })
      .finally(() => setStatus({ isLoading: false }));
  }, []);

  if (isLoading) {
    return <></>;
  }

  return (
    <>
      <ExplorationSetup />
      <EditorSetup />
      <TranspilationSetup />
    </>
  );
};

export { PlaygroundSetup };
