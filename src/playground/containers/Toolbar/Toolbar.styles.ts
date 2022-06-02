import type { NTTheme, NTStyles } from '../../../types';
import { NT_BREAKPOINTS as breakpoints } from '../../../constants';

const createStyles = (theme: NTTheme): NTStyles => {
  return {
    root: {
      display: 'flex',
      flexDirection: 'row',
      padding: theme.space(2),

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
