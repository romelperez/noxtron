import type { Theme, Styles } from '@src/apps/types';

const createStyles = (theme: Theme): Styles => {
  return {
    root: {
      display: 'flex'
    },
    sandbox: {
      flex: 1,
      display: 'block',
      margin: 0,
      outline: 'none',
      border: 'none',
      padding: 0,
      background: 'transparent'
    }
  };
};

export { createStyles };
