import type { CSSObject, Theme } from '@emotion/react';

const createStyles = (theme: Theme): Record<string, CSSObject> => {
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
      ...theme.typography.code(1)
    }
  };
};

export { createStyles };
