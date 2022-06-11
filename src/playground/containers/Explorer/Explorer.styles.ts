import { NT_BREAKPOINTS } from 'src/constants';
import type { NTTheme, NTStyles } from '../../../types';
import { animationAppear } from '../../utils/animations';

const createStyles = (theme: NTTheme): NTStyles => {
  return {
    root: {
      position: 'relative',
      display: 'flex',
      width: '100%',
      height: '100%',
      animation: `${animationAppear} 0.2s ease-out`,

      [NT_BREAKPOINTS.medium.up]: {
        width: 300
      }
    },
    container: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      overflowY: 'auto',
      padding: theme.space(2)
    },
    nav: {
      display: 'flex',
      flexDirection: 'column',
      flex: 1
    }
  };
};

export { createStyles };
