import type { Theme, Styles } from '../../../types';

const createStyles = (theme: Theme): Styles => {
  const { primary } = theme.colors;
  const isDark = theme.colorScheme === 'dark';

  const bgNeutral = isDark ? primary.bg(3) : primary.bg(1);
  const bgFocus = isDark ? primary.bg(2) : primary.bg(0);
  const line = isDark
    ? `1px solid ${primary.deco(8)}`
    : `1px solid ${primary.deco(12)}`;

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
      minWidth: 0, // Width overflow issue.
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
      flexDirection: 'row',
      minWidth: 0, // Width overflow issue.
      minHeight: 0 // Height overflow issue.
    },
    panel: {
      flex: '1 1 50%',
      minWidth: 0, // Width overflow issue.
      position: 'relative',
      overflow: 'hidden',
      backgroundColor: bgFocus,
      transition: 'width 200ms ease-out'
    },
    panelEditor: {
      //
    },
    panelPreview: {
      [theme.breakpoints.medium.up]: {
        '* + &': {
          borderLeft: line
        }
      }
    },
    desktopFooter: {
      display: 'none', // Hidden on mobile.
      borderTop: line,
      backgroundColor: bgNeutral,

      [theme.breakpoints.medium.up]: {
        display: 'flex'
      }
    }
  };
};

export { createStyles };
