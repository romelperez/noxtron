/** @jsx jsx */
import { jsx, useTheme } from '@emotion/react';
import { ReactElement, ReactNode, useMemo } from 'react';

import { cx } from '../../utils/cx';
import { createStyles } from './StatusMessage.styles';

interface LoadingProps {
  className?: string;
  children: ReactNode;
}

const StatusMessage = (props: LoadingProps): ReactElement => {
  const { className, children } = props;

  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <div className={cx('status-message', className)} css={styles.root}>
      <div className="status-message__content" css={styles.content}>
        {children}
      </div>
    </div>
  );
};

export { StatusMessage };
