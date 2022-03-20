import type { CSSObject, Theme } from '@emotion/react';

const createStyles = (theme: Theme): Record<string, CSSObject> => {
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
      display: 'block'
    }
  };
};

export { createStyles };
