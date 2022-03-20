import type { CSSObject, Theme } from '@emotion/react';

const createStyles = (theme: Theme): Record<string, CSSObject> => {
  return {
    root: {
      display: 'flex'
    },
    sandbox: {
      flex: 1,
      display: 'block',
      margin: 0,
      outline: 'none',
      border: 'none',
      padding: 0,
      background: 'transparent'
    }
  };
};

export { createStyles };
