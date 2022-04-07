import type { NTTheme, NTStyles } from '../../../types';
import { NT_BREAKPOINTS as breakpoints } from '../../../constants';

const createStyles = (theme: NTTheme): NTStyles => {
  return {
    root: {
      display: 'block',
      padding: theme.space(4),

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
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: theme.space(2),
      ...theme.typography.cta(3),

      [breakpoints.large.up]: {
        ...theme.typography.cta(2)
      }
    },
    optionIcon: {
      width: '1em',
      height: '1em'
    },
    optionLabel: {
      display: 'inline-block',
      marginLeft: theme.space(1)
    },
    location: {
      flex: 1,
      ...theme.typography.code(2),
      overflow: 'hidden',
      marginLeft: theme.space(3),
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      letterSpacing: '-1px',

      [breakpoints.large.up]: {
        ...theme.typography.code(2)
      }
    }
  };
};

export { createStyles };
