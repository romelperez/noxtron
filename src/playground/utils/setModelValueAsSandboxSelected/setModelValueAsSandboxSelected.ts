import { NTMonacoModel, NTSandbox } from '../../../types';

const setModelValueAsSandboxSelected = (
  model: NTMonacoModel,
  sandboxSelected: NTSandbox | null
): void => {
  if (sandboxSelected) {
    const baseCode = sandboxSelected.code || '';
    if (baseCode !== model.getValue()) {
      model.setValue(baseCode);
    }
  }
};

export { setModelValueAsSandboxSelected };
