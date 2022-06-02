import type { NTTheme, NTStyles } from '../../../types';
import { NT_BREAKPOINTS as breakpoints } from '../../../constants';
import { animationAppear } from '../../utils/animations';

const createStyles = (theme: NTTheme): NTStyles => {
  return {
    root: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: theme.space(2),
      animation: `${animationAppear} 0.2s ease-out`
    },
    options: {},
    option: {
      marginRight: theme.space(2)
    },
    optionLabel: {
      [breakpoints.large.down]: {
        display: 'none'
      }
    },
    content: {
      flex: 1,
      display: 'flex',
      flexDirection: 'row'
    },
    custom: {
      flex: 1
    },
    logo: {
      marginLeft: theme.space(2),
      ...theme.typography.heading(2),

      [breakpoints.medium.up]: {
        ...theme.typography.heading(0)
      }
    }
  };
};

export { createStyles };
