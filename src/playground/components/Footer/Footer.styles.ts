import type { NTTheme, NTStyles } from '../../../types';
import { NT_BREAKPOINTS as breakpoints } from '../../../constants';

const createStyles = (theme: NTTheme, hasLinks: boolean): NTStyles => {
  return {
    root: {
      ...theme.typography.body(2),
      display: hasLinks ? 'flex' : 'none',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.space(3),

      [breakpoints.medium.up]: {
        ...theme.typography.body(1),
        padding: theme.space(4),
        flexDirection: 'row',
        justifyContent: 'space-between'
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
        marginLeft: theme.space(4)
      }
    }
  };
};

export { createStyles };
