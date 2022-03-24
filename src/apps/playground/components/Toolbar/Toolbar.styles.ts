import type { NTTheme, NTStyles } from '../../../types';

const createStyles = (theme: NTTheme): NTStyles => {
  return {
    root: {
      display: 'block',
      padding: theme.space(4),

      [theme.breakpoints.medium.up]: {
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
      marginRight: theme.space(2)
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
      ...theme.typography.code(1),
      overflow: 'hidden',
      marginLeft: theme.space(2),
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      letterSpacing: '-1px'
    }
  };
};

export { createStyles };
