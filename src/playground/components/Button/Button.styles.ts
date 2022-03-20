import type { Theme, CSSObject } from '@emotion/react';

interface StyleProps {
  color?: keyof Theme['colors']
  size?: 'default' | 'small'
  disabled?: boolean
}

const createStyles = (theme: Theme, props: StyleProps): Record<string, CSSObject> => {
  const { color, disabled, size = 'default' } = props;
  const palette = theme.colors[color || 'primary'];
  const isSmall = size === 'small';

  return {
    root: {
      display: 'inline-block',
      outline: 'none',
      border: 'none',
      padding: `${theme.space(isSmall ? 1 : 2)}px ${theme.space(isSmall ? 2 : 4)}px`,
      verticalAlign: 'middle',
      ...theme.typography.cta(isSmall ? 1 : 0),
      lineHeight: 1,
      color: palette.textHigh(14),
      backgroundColor: palette.levelHigh(1),
      cursor: disabled ? 'not-allowed' : 'pointer',
      userSelect: 'none',
      opacity: disabled ? 0.6 : 1,
      transitionDuration: '200ms',
      transitionTimingFunction: 'ease-out',
      transitionProperty: 'color, background-color',

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
