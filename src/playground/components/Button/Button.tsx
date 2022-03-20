/** @jsx jsx */
import { jsx, Theme, useTheme } from '@emotion/react';
import { ReactNode, ReactElement, useMemo } from 'react';

import { createStyles } from './Button.styles';

interface ButtonProps {
  className?: string
  color?: keyof Theme['colors']
  size?: 'default' | 'small'
  disabled?: boolean
  onClick?: () => void
  children?: ReactNode
}

const Button = (props: ButtonProps): ReactElement => {
  const { className, color, size, disabled, onClick, children } = props;

  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme, props), [theme, color, size, disabled]);

  return (
    <button
      className={className}
      css={styles.root}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export { Button };