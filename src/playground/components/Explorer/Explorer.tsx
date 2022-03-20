/** @jsx jsx */
import { jsx, useTheme } from '@emotion/react';
import { ReactElement, useMemo } from 'react';

import { Button } from '../Button';
import { createStyles } from './Explorer.styles';

interface ExplorerProps {
  className?: string
}

const Explorer = (props: ExplorerProps): ReactElement => {
  const { className } = props;

  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <aside
      className={className}
      css={styles.root}
    >
      EXPLORER
    </aside>
  );
};

export { Explorer };
