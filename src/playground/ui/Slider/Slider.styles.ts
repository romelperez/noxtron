import type { NTTheme, NTStyles } from '../../../types';

const createStyles = (theme: NTTheme, position: 'left' | 'right'): NTStyles => {
  const isLeft = position === 'left';

  return {
    root: {
      zIndex: 100,
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: isLeft ? 0 : 'auto',
      right: isLeft ? 'auto' : 0,
      cursor: 'ew-resize'
    },
    rootIsInactive: {
      transform: isLeft ? 'translateX(-4px)' : 'translateX(4px)',
      width: '7px'
    },
    // Make the slider container wide enough so the mouse wouldn't get out to places
    // where the mouse events break. For example, when the mouse goes to an iframe
    // (the preview iframe), the mouse events are lost.
    rootIsActive: {
      transform: isLeft ? 'translateX(-30vw)' : 'translateX(30vw)',
      width: '60vw'
    },
    bar: {
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
    },
    icon: {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      color: theme.colors.primary.decoHigh(5),
      width: theme.space(5),
      height: theme.space(5)
    }
  };
};

export { createStyles };
