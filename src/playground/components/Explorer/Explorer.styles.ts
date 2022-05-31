import type { NTTheme, NTStyles } from '../../../types';
import { NT_BREAKPOINTS as breakpoints } from '../../../constants';

const createStyles = (theme: NTTheme): NTStyles => {
  const { primary, secondary } = theme.colors;

  return {
    root: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      overflowY: 'auto',
      padding: theme.space(2)
    },
    nav: {
      display: 'flex',
      flexDirection: 'column',
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
      ...theme.typography.cta(3),
      textTransform: 'none',
      wordBreak: 'break-all',
      color: primary.text(12),
      transitionProperty: 'color, background-color',
      transitionTimingFunction: 'ease-out',
      transitionDuration: '0.2s',

      [breakpoints.large.up]: {
        ...theme.typography.cta(2),
        textTransform: 'none'
      }
    },
    itemActive: {
      color: secondary.text(12),
      backgroundColor: secondary.level(1)
    },
    link: {
      display: 'block',
      boxShadow: 'none',
      outline: 'none',
      border: 'none',
      width: '100%',
      textAlign: 'left',
      color: primary.textHigh(14),
      background: 'transparent',
      cursor: 'pointer',

      '&:hover, &:focus': {
        color: primary.textHigh(18)
      }
    },
    linkActive: {
      borderRightWidth: 2,
      borderRightStyle: 'solid',
      borderRightColor: secondary.levelHigh(14),
      color: secondary.textHigh(14),
      backgroundColor: secondary.levelHigh(1),

      '&:hover, &:focus': {
        color: secondary.textHigh(18)
      }
    }
  };
};

export { createStyles };
