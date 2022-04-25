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
    },
    transpilationInProgress: {
      position: 'relative',
      alignSelf: 'flex-start',
      width: '100%',
      borderBottomWidth: 1,
      borderBottomStyle: 'solid',
      borderBottomColor: theme.colors.secondary.decoHigh(4),

      '&::before': {
        content: '""',
        position: 'absolute',
        left: 0,
        top: 0,
        width: '20%',
        borderBottomWidth: 1,
        borderBottomStyle: 'solid',
        borderBottomColor: theme.colors.secondary.decoHigh(12),
        animation: `${lineMovementKeyframe} 0.5s ease-in-out infinite alternate`
      }
    }
  };
};

export { createStyles };
