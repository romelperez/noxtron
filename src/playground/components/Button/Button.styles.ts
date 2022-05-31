import type { NTTheme, NTStyles } from '../../../types';

interface StyleProps {
  color?: keyof NTTheme['colors'];
  size?: 'default' | 'small';
  disabled?: boolean;
}

const createStyles = (theme: NTTheme, props: StyleProps): NTStyles => {
  const { color, disabled, size = 'default' } = props;

  const palette = theme.colors[color || 'primary'];
  const isSmall = size === 'small';

  return {
    root: {
      display: 'inline-block',
      outline: 'none',
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: palette.levelHigh(3),
      padding: `${theme.space(isSmall ? 1 : 2)}px ${theme.space(
        isSmall ? 3 : 4
      )}px`,
      verticalAlign: 'middle',
      ...theme.typography.cta(isSmall ? 1 : 0),
      lineHeight: 1,
      color: palette.textHigh(14),
      backgroundColor: palette.levelHigh(1),
      cursor: disabled ? 'not-allowed' : 'pointer',
      userSelect: 'none',
      opacity: disabled ? 0.6 : 1,
      transitionProperty: 'color, background-color, border-color',
      transitionTimingFunction: 'ease-out',
      transitionDuration: '0.2s',

      '&::-moz-focus-inner': {
        border: 'none'
      },
      '&:hover, &:focus': !disabled && {
        color: palette.textHigh(18),
        backgroundColor: palette.levelHigh(3)
      }
    }
  };
};

export { createStyles };
