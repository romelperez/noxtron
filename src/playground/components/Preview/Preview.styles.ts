import type { NTStyles } from '../../../types';

const createStyles = (): NTStyles => {
  return {
    root: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column'
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
