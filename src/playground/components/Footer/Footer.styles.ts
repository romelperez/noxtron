import type { CSSObject, Theme } from '@emotion/react';

const createStyles = (theme: Theme): Record<string, CSSObject> => {
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
