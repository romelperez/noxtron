import type { Theme, Styles } from '@src/types';

const createStyles = (theme: Theme): Styles => {
  return {
    root: {
      padding: theme.space(4)
    }
  };
};

export { createStyles };
