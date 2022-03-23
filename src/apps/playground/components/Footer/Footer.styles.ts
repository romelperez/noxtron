import type { Theme, Styles } from '@src/apps/types';

const createStyles = (theme: Theme): Styles => {
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
      flexDirection: 'row',
      a: {
        display: 'inline-block',
      },
      'a + a': {
        marginLeft: theme.space(4)
      }
    }
  };
};

export { createStyles };
