import type { Theme, Styles } from '@src/types';

const createStyles = (theme: Theme): Styles => {
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
