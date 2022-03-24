import type { NTTheme, NTStyles } from '../../../types';

const createStyles = (theme: NTTheme): NTStyles => {
  const isDark = theme.colorScheme === 'dark';
  const { primary, secondary } = theme.colors;

  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      overflowY: 'auto',
      padding: theme.space(4)
    },
    nav: {
      flex: 1,

      ul: {
        display: 'block',
        listStyle: 'none',
        ul: {
          marginLeft: theme.space(4)
        }
      },
      li: {
        display: 'block'
      }
    },
    item: {
      display: 'block',
      padding: theme.space(2),
      ...theme.typography.cta(1),
      textTransform: 'none',
      wordBreak: 'break-all',
      color: isDark ? primary.text(12) : primary.text(18),
      transitionProperty: 'color, background-color',
      transitionTimingFunction: 'ease-out',
      transitionDuration: '0.2s'
    },
    itemActive: {
      color: isDark ? secondary.text(12) : secondary.text(18),
      backgroundColor: isDark ? secondary.level(1) : secondary.level(5)
    },
    link: {
      display: 'block',
      boxShadow: 'none',
      outline: 'none',
      border: 'none',
      width: '100%',
      textAlign: 'left',
      color: isDark ? primary.textHigh(12) : primary.textHigh(18),
      background: 'transparent',
      cursor: 'pointer',

      '&:hover, &:focus': {
        color: isDark ? primary.textHigh(14) : primary.textHigh(20)
      }
    },
    linkActive: {
      color: isDark ? secondary.textHigh(12) : secondary.textHigh(18),
      backgroundColor: isDark ? secondary.levelHigh(1) : secondary.levelHigh(5),

      '&:hover, &:focus': {
        color: isDark ? secondary.textHigh(14) : secondary.textHigh(20)
      }
    }
  };
};

export { createStyles };
