import { keyframes } from '@emotion/react';

import type { NTTheme, NTStyles } from '../../../types';

const lineMovementKeyframe = keyframes`
  from {
    opacity: 0.5;
    transform: translateX(0%);
  }
  50% {
    opacity: 1;
  }
  to {
    opacity: 0.5;
    transform: translateX(400%);
  }
`;

const createStyles = (theme: NTTheme): NTStyles => {
  const lineWidth = 2;

  return {
    root: {
      position: 'relative',
      width: '100%',
      borderTopWidth: lineWidth,
      borderTopStyle: 'solid',
      borderTopColor: theme.colors.secondary.decoHigh(4),

      '&::before': {
        content: '""',
        position: 'absolute',
        left: 0,
        top: -lineWidth,
        width: '20%',
        borderTopWidth: lineWidth,
        borderTopStyle: 'solid',
        borderTopColor: theme.colors.secondary.decoHigh(12),
        animation: `${lineMovementKeyframe} 0.5s ease-in-out infinite alternate`
      }
    },
    full: {
      position: 'absolute',
      left: 0,
      top: 0
    }
  };
};

export { createStyles };
