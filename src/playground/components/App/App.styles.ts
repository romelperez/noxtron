import type { NTTheme, NTStyles } from '../../../types';
import { NT_BREAKPOINTS as breakpoints } from '../../../constants';

const createStyles = (theme: NTTheme): NTStyles => {
  const { primary } = theme.colors;
  const isDark = theme.colorScheme === 'dark';

  const bg1 = isDark ? primary.bg(2) : primary.bg(2);
  const bg2 = isDark ? primary.bg(3) : primary.bg(1);
  const bg3 = isDark ? primary.bg(4) : primary.bg(0);
  const line1 = isDark
    ? `1px solid ${primary.deco(8)}`
    : `1px solid ${primary.deco(12)}`;
  const line2 = isDark
    ? `1px solid ${primary.deco(4)}`
    : `1px solid ${primary.deco(8)}`;

  return {
    global: {
      '*, *:before, *:after': {
        boxSizing: 'border-box',
        margin: 0,
        padding: 0
      },
      html: {
        overflow: 'hidden',
        lineHeight: 1.2,
        color: primary.text(16),
        ...theme.typography.body(0),
        backgroundColor: primary.bg(1),
        scrollbarWidth: 'thin',
        scrollbarColor: 'red blue'
      },
      '::-webkit-scrollbar': {
        width: 8
      },
      '::-webkit-scrollbar-track': {
        background: 'red'
      },
      '::-webkit-scrollbar-thumb': {
        background: 'red'
      },
      '::selection': {
        backgroundColor: primary.text(4),
        color: primary.bg(2)
      },
      'h1, h2, h3, h4, h5, h6': {
        color: primary.text(16),
        textTransform: 'uppercase'
      },
      h1: { ...theme.typography.heading(0) },
      h2: { ...theme.typography.heading(1) },
      h3: { ...theme.typography.heading(2) },
      h4: { ...theme.typography.heading(3) },
      h5: { ...theme.typography.heading(4) },
      h6: { ...theme.typography.heading(5) },
      a: {
        color: isDark ? primary.textHigh(14) : primary.textHigh(18),
        textDecoration: 'none',
        transition: 'color 200ms ease-out',

        '&:hover': {
          color: isDark ? primary.textHigh(12) : primary.textHigh(20)
        }
      },
      'code, pre': {
        ...theme.typography.code(0)
      }
    },
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
      borderBottom: line1,
      backgroundColor: bg1
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
      backgroundColor: bg1,

      [breakpoints.medium.up]: {
        flex: 'none',
        width: 300,
        borderRight: line2
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
      borderBottom: line2,
      backgroundColor: bg2,

      [breakpoints.medium.up]: {
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
      backgroundColor: bg3,
      transition: 'width 200ms ease-out'
    },
    panelEditor: {
      //
    },
    panelPreview: {
      [breakpoints.medium.up]: {
        '* + &': {
          borderLeft: line2
        }
      }
    },
    desktopFooter: {
      display: 'none', // Hidden on mobile.
      borderTop: line1,
      backgroundColor: bg1,

      [breakpoints.medium.up]: {
        display: 'flex'
      }
    }
  };
};

export { createStyles };
