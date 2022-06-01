import type { NTTheme, NTStyles } from '../../../types';

const createStyles = (theme: NTTheme): NTStyles => {
  return {
    root: {
      position: 'absolute',
      left: -3,
      right: 'auto',
      top: 0,
      bottom: 0,
      width: 6,
      cursor: 'ew-resize'
    },
    toRight: {
      left: 'auto',
      right: -3
    },
    bar: {
      zIndex: 2,
      position: 'absolute',
      left: '50%',
      top: 0,
      bottom: 0,
      transform: 'translateX(-3px)',
      width: 6,
      backgroundColor: theme.colors.secondary.decoHigh(10),
      transitionProperty: 'opacity',
      transitionDuration: '0.1s',
      transitionTimingFunction: 'ease-out',
      opacity: 0 // Animated.
    }
  };
};

export { createStyles };
