/** @jsx jsx */
import { jsx, useTheme } from '@emotion/react';
import { ReactElement, ReactNode, useMemo } from 'react';

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
    <div className={className} css={styles.root}>
      <div css={styles.content}>{children}</div>
    </div>
  );
};

export { StatusMessage };
