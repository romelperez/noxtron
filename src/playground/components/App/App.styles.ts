import type { CSSObject, Theme } from '@emotion/react';

const createStyles = (theme: Theme): Record<string, CSSObject> => {
  const bgNeutral = theme.colors.primary.bg(3);
  const bgFocus = theme.colors.primary.bg(2);
  const line = `1px solid ${theme.colors.primary.deco(8)}`;

  return {
    root: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      display: 'flex',
      flexDirection: 'column'
    },
    header: {
      borderBottom: line,
      backgroundColor: bgNeutral
    },
    footer: {
      borderTop: line,
      backgroundColor: bgNeutral
    },
    main: {
      flex: 1,
      display: 'flex',
      flexDirection: 'row',
      minHeight: 0 // Height overflow issue.
    },
    explorer: {
      flex: 1,
      minHeight: 0, // Height overflow issue.
      backgroundColor: bgNeutral,

      [theme.breakpoints.medium.up]: {
        flex: 'none',
        width: 300,
        borderRight: line
      }
    },
    workspace: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      minHeight: 0 // Height overflow issue.
    },
    toolbar: {
      display: 'none', // Hidden on mobile.
      borderBottom: line,
      backgroundColor: bgNeutral,

      [theme.breakpoints.medium.up]: {
        display: 'flex'
      }
    },
    panels: {
      flex: 1,
      display: 'flex',
      flexDirection: 'row'
    },
    panel: {
      flex: 1,
      position: 'relative',
      overflow: 'auto',
      backgroundColor: bgFocus
    },
    panelEditor: {
      [theme.breakpoints.medium.up]: {
        borderRight: line
      }
    },
    panelPreview: {
      //
    }
  };
};

export { createStyles };
