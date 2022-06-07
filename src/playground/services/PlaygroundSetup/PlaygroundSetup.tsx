import React, { ReactElement, useEffect, useMemo } from 'react';

import {
  NTMonaco,
  NTSandbox,
  NTPlaygroundSettingsTypeDefinition
} from '../../../types';
import { usePlaygroundSettings } from '../../utils';
import { useStore } from '../useStore';
import { ExplorationSetup } from '../ExplorationSetup';
import { EditorSetup } from '../EditorSetup';
import { TranspilationSetup } from '../TranspilationSetup';

const PlaygroundSetup = (): ReactElement => {
  const settings = usePlaygroundSettings();
  const setStatus = useStore((state) => state.setStatus);
  const setDependencies = useStore((state) => state.setDependencies);
  const isLoading = useStore((state) => state.isLoading);
  const error = useStore((state) => state.error);

  useMemo(() => {
    const { assetsPath } = settings;
    const assetsPathPrefix = assetsPath.endsWith('/')
      ? assetsPath
      : `${assetsPath}/`;

    // @ts-ignore
    window.MonacoEnvironment = {
      getWorkerUrl: (moduleId: string, label: string): string => {
        if (label === 'typescript' || label === 'javascript') {
          return `${assetsPathPrefix}ts.worker.js`;
        }
        return `${assetsPathPrefix}editor.worker.js`;
      }
    };
  }, []);

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

  if (isLoading || !!error) {
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
