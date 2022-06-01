/** @jsx jsx */
import { jsx, useTheme } from '@emotion/react';
import { ReactElement, useMemo } from 'react';

import { cx } from '../../utils/cx';
import { createStyles } from './Loading.styles';

interface LoadingProps {
  className?: string;
  full?: boolean;
}

const Loading = (props: LoadingProps): ReactElement => {
  const { full, className } = props;

  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <div
      className={cx('loading', className)}
      css={[styles.root, full && styles.full]}
    />
  );
};

export { Loading };
