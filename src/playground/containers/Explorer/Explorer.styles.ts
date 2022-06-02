import type { NTTheme, NTStyles } from '../../../types';
import { animationAppear } from '../../utils/animations';

const createStyles = (theme: NTTheme): NTStyles => {
  return {
    root: {
      position: 'relative',
      display: 'flex',
      animation: `${animationAppear} 0.2s ease-out`
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
