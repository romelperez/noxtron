import type { NTTheme, NTStyles } from '../../../types';

const createStyles = (theme: NTTheme): NTStyles => {
  return {
    root: {
      position: 'absolute',
      right: -2,
      top: 0,
      bottom: 0,
      width: 3,
      backgroundColor: 'hsla(0, 50%, 50%, 0.4)',
      cursor: 'ew-resize'
    },
    isHold: {
      backgroundColor: 'hsla(120, 50%, 50%, 0.4)'
    }
  };
};

export { createStyles };
