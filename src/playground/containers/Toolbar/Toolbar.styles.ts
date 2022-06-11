import type { NTTheme, NTStyles } from '../../../types';
import { NT_BREAKPOINTS as breakpoints } from '../../../constants';
import { animationAppear } from '../../utils/animations';

const createStyles = (theme: NTTheme): NTStyles => {
  return {
    root: {
      display: 'flex',
      flexDirection: 'row',
      padding: theme.space(2),
      width: '100%',
      animation: `${animationAppear} 0.2s ease-out`,

      [breakpoints.medium.up]: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
      }
    },
    options: {
      display: 'flex',
      flexDirection: 'row'
    },
    option: {
      marginRight: theme.space(2)
    },
    optionLabel: {
      [breakpoints.large.down]: {
        display: 'none'
      }
    },
    custom: {
      flex: 1
    }
  };
};

export { createStyles };
