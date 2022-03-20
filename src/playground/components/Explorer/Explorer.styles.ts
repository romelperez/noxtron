import type { CSSObject, Theme } from '@emotion/react';

const createStyles = (theme: Theme): Record<string, CSSObject> => {
  return {
    root: {
      padding: theme.space(4)
    }
  };
};

export { createStyles };
