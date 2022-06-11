import { NTSetup } from '../../../types';

const setupMonacoEnvironment = (setup: NTSetup) => {
  const { assetsPath } = setup;

  // @ts-ignore
  window.MonacoEnvironment = {
    getWorkerUrl: (moduleId: string, label: string): string => {
      if (label === 'typescript' || label === 'javascript') {
        return `${assetsPath}ts.worker.js`;
      }
      return `${assetsPath}editor.worker.js`;
    }
  };
};

export { setupMonacoEnvironment };
