import type { CSSObject, Theme } from '@emotion/react';

const createStyles = (theme: Theme): Record<string, CSSObject> => {
  const bgNeutral = theme.colors.primary.bg(4);
  const bgFocus = theme.colors.primary.bg(3);
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
      padding: theme.space(4),
      backgroundColor: bgNeutral
    },
    footer: {
      borderTop: line,
      padding: theme.space(4),
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
      padding: theme.space(4),
      minHeight: 0, // Height overflow issue.
      backgroundColor: bgNeutral,

      [theme.breakpoints.medium.up]: {
        flex: '280px',
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
      padding: theme.space(4),
      backgroundColor: bgNeutral,

      [theme.breakpoints.medium.up]: {
        display: 'block'
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
