import { createEffect } from 'effector';

import {
  NTMonaco,
  NTMonacoModel,
  NTSandbox,
  NTTypeDefinition
} from '../../../types';
import { $setup } from '../../stores';
import {
  setupMonacoEnvironment,
  getMonaco,
  setupMonacoCompilers
} from '../../utils';

const loadDependencies = createEffect(() => {
  const setup = $setup.getState();
  const { getSandboxes, getTypeDefinitions, codeLanguage } = setup;

  setupMonacoEnvironment(setup);

  return Promise.all(
    [getMonaco(setup), getSandboxes(), getTypeDefinitions?.()].filter(Boolean)
  ).then((dependencies) => {
    const monaco = dependencies[0] as NTMonaco;
    const sandboxes = dependencies[1] as NTSandbox[];
    const typeDefinitions = (dependencies[2] || []) as NTTypeDefinition[];

    const codeInitial = '';
    const filename = monaco.Uri.parse(
      codeLanguage === 'typescript' ? 'sandbox.tsx' : 'sandbox.jsx'
    );
    const model: NTMonacoModel = monaco.editor.createModel(
      codeInitial,
      codeLanguage,
      filename
    );

    setupMonacoCompilers(monaco, typeDefinitions);

    return {
      monaco,
      model,
      sandboxes,
      typeDefinitions
    };
  });
});

export { loadDependencies };
