import type { NTTheme, NTStyles } from '../../../types';
import { NT_BREAKPOINTS as breakpoints } from '../../../constants';
import { animationAppear } from '../../utils/animations';

const createStyles = (theme: NTTheme, hasLinks: boolean): NTStyles => {
  return {
    root: {
      display: hasLinks ? 'flex' : 'none',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.space(2),
      animation: `${animationAppear} 0.2s ease-out`,
      ...theme.typography.body(3),

      [breakpoints.medium.up]: {
        padding: theme.space(2),
        flexDirection: 'row',
        justifyContent: 'space-between'
      },
      [breakpoints.large.up]: {
        ...theme.typography.body(2)
      }
    },
    section: {
      display: 'flex',
      flexDirection: 'row',
      '& + &': {
        marginTop: theme.space(2)
      },

      [breakpoints.medium.up]: {
        '& + &': {
          marginTop: 0
        }
      }
    },
    item: {
      display: 'inline-block',
      '& + &': {
        marginLeft: theme.space(2)
      }
    }
  };
};

export { createStyles };
