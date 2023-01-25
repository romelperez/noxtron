import type { NTTheme, NTStyles } from '../../../types';
import { NT_BREAKPOINTS as breakpoints } from '../../../constants';

interface StyleProps {
  color?: keyof NTTheme['colors'];
  size?: 'default' | 'small';
  disabled?: boolean;
}

const createStyles = (theme: NTTheme, props: StyleProps): NTStyles => {
  const { color, disabled, size = 'default' } = props;

  const { space } = theme;
  const palette = theme.colors[color || 'primary'];
  const isSmall = size === 'small';

  return {
    root: {
      display: 'inline-flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      outline: 'none',
      border: 'none',
      padding: `${space(isSmall ? 1 : 2)}px ${space(isSmall ? 3 : 3)}px`,
      verticalAlign: 'middle',
      ...theme.typography.cta(isSmall ? 3 : 2),
      lineHeight: 1.2, // Because it may have SVG icons with this size.
      color: palette.textHigh(14),
      backgroundColor: 'transparent',
      cursor: disabled ? 'not-allowed' : 'pointer',
      userSelect: 'none',
      opacity: disabled ? 0.6 : 1,
      transitionProperty: 'color, background-color, border-color',
      transitionTimingFunction: 'ease-out',
      transitionDuration: '0.2s',

      svg: {
        display: 'inline-block',
        width: '1.2em',
        height: '1.2em',

        '& + *': {
          marginLeft: space(1)
        }
      },

      '&::-moz-focus-inner': {
        border: 'none'
      },
      '&:hover, &:focus': !disabled && {
        color: palette.textHigh(18),
        backgroundColor: palette.levelHigh(3)
      },
      [breakpoints.large.up]: {
        padding: `${space(isSmall ? 1 : 2)}px ${space(isSmall ? 3 : 4)}px`,
        ...theme.typography.cta(isSmall ? 2 : 1),

        svg: {
          '& + *': {
            marginLeft: space(2)
          }
        }
      }
    }
  };
};

export { createStyles };
