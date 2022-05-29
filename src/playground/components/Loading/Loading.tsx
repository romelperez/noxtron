/** @jsx jsx */
import { jsx, useTheme } from '@emotion/react';
import { ReactElement, useMemo } from 'react';

import { createStyles } from './Loading.styles';

interface LoadingProps {
  className?: string;
}

const Loading = (props: LoadingProps): ReactElement => {
  const { className } = props;

  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return <div className={className} css={styles.root} />;
};

export { Loading };
