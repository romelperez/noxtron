import type { NTTheme, NTStyles } from '../../../types';

const createStyles = (theme: NTTheme): NTStyles => {
  return {
    root: {
      display: 'flex'
    },
    editor: {
      flex: 1
    }
  };
};

export { createStyles };
