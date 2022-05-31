import type { NTStyles } from '../../../types';

const createStyles = (): NTStyles => {
  return {
    root: {
      position: 'absolute',
      right: -2,
      top: 0,
      bottom: 0,
      width: 3,
      backgroundColor: 'transparent',
      cursor: 'ew-resize'
    }
  };
};

export { createStyles };
