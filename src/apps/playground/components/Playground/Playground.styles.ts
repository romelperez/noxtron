import type { Theme, Styles } from '../../../types';

const createStyles = (theme: Theme): Styles => ({
  global: {
    '*, *:before, *:after': {
      boxSizing: 'border-box',
      margin: 0,
      padding: 0
    },
    html: {
      overflow: 'hidden',
      lineHeight: 1.2,
      color: theme.colors.primary.text(16),
      ...theme.typography.body(0),
      backgroundColor: theme.colors.primary.bg(1),
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
      backgroundColor: theme.colors.primary.text(4),
      color: theme.colors.primary.bg(2)
    },
    'h1, h2, h3, h4, h5, h6': {
      color: theme.colors.primary.text(16),
      textTransform: 'uppercase'
    },
    h1: { ...theme.typography.heading(0) },
    h2: { ...theme.typography.heading(1) },
    h3: { ...theme.typography.heading(2) },
    h4: { ...theme.typography.heading(3) },
    h5: { ...theme.typography.heading(4) },
    h6: { ...theme.typography.heading(5) },
    a: {
      color: theme.colors.primary.textHigh(14),
      textDecoration: 'none',
      transition: 'color 200ms ease-out',

      '&:hover': {
        color: theme.colors.primary.textHigh(12)
      }
    },
    'code, pre': {
      ...theme.typography.code(0)
    }
  }
});

export { createStyles };