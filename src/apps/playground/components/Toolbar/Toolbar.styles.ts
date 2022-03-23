import type { Theme, Styles } from '../../../types';

const createStyles = (theme: Theme): Styles => {
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
      flexDirection: 'row',
      marginRight: theme.space(4),

      'button + button': {
        marginLeft: theme.space(2)
      }
    },
    location: {
      flex: 1,
      ...theme.typography.code(1),
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      letterSpacing: '-1px'
    }
  };
};

export { createStyles };
