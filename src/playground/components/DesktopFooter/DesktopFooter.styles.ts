import type { NTTheme, NTStyles } from '../../../types';

const createStyles = (theme: NTTheme): NTStyles => {
  return {
    root: {
      ...theme.typography.body(1),
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: theme.space(4)
    },
    section: {
      display: 'flex',
      flexDirection: 'row'
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
