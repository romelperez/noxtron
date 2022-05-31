import type { NTTheme, NTStyles } from '../../../types';

const createStyles = (theme: NTTheme): NTStyles => {
  return {
    root: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingLeft: theme.space(2),
      paddingRight: theme.space(2),
      paddingTop: theme.space(4),
      paddingBottom: theme.space(4),
      width: '100%',
      ...theme.typography.body(2),
      textAlign: 'center'
    },
    content: {
      flex: 1
    }
  };
};

export { createStyles };
