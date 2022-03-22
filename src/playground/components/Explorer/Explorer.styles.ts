import type { Theme, Styles } from '@src/types';

const createStyles = (theme: Theme): Styles => {
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
      wordBreak: 'break-all',
      color: theme.colors.primary.text(12)
    },
    itemActive: {
      color: theme.colors.secondary.text(12),
      backgroundColor: theme.colors.secondary.level(1)
    },
    link: {
      color: theme.colors.primary.textHigh(12),

      '&:hover, &:focus': {
        color: theme.colors.primary.textHigh(14)
      }
    },
    linkActive: {
      color: theme.colors.secondary.textHigh(12),
      backgroundColor: theme.colors.secondary.levelHigh(1),

      '&:hover, &:focus': {
        color: theme.colors.secondary.textHigh(14)
      }
    }
  };
};

export { createStyles };
