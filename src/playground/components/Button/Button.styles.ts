import type { Theme, Styles } from '@src/types';

interface StyleProps {
  color?: keyof Theme['colors']
  size?: 'default' | 'small'
  disabled?: boolean
}

const createStyles = (theme: Theme, props: StyleProps): Styles => {
  const { color, disabled, size = 'default' } = props;

  const palette = theme.colors[color || 'primary'];
  const isDark = theme.colorScheme === 'dark';
  const isSmall = size === 'small';

  return {
    root: {
      display: 'inline-block',
      outline: 'none',
      border: isDark
        ? `1px solid ${palette.levelHigh(2)}`
        : `1px solid ${palette.decoHigh(8)}`,
      padding: `${theme.space(isSmall ? 1 : 2)}px ${theme.space(isSmall ? 3 : 4)}px`,
      verticalAlign: 'middle',
      ...theme.typography.cta(isSmall ? 1 : 0),
      lineHeight: 1,
      color: isDark
        ? palette.textHigh(14)
        : palette.textHigh(18),
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
        backgroundColor: palette.levelHigh(2),
      }
    }
  };
};

export { createStyles };
