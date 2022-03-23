import type { Theme, Styles } from '@src/apps/types';

const createStyles = (theme: Theme): Styles => {
  return {
    root: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: theme.space(4)
    },
    options: {
      'button + button': {
        marginLeft: theme.space(4)
      }
    },
    logo: {
      display: 'block',
      ...theme.typography.heading(0)
    }
  };
};

export { createStyles };
