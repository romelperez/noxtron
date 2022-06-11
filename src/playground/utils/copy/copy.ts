import { NTMonacoModel } from '../../../types';

const copy = (model: NTMonacoModel) => {
  window.navigator.clipboard.writeText(model.getValue());
};

export { copy };
