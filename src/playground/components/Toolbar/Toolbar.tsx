/** @jsx jsx */
import { jsx, useTheme } from '@emotion/react';
import { ReactElement, useMemo } from 'react';

import { cx } from '@src/utils/cx';
import { Button } from '../Button';
import { createStyles } from './Toolbar.styles';

interface ToolbarProps {
  className?: string
}

const Toolbar = (props: ToolbarProps): ReactElement => {
  const { className } = props;

  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <nav
      className={cx('toolbar', className)}
      css={styles.root}
    >
      <div css={styles.options}>
        <Button size='small'>Copy</Button>
        <Button size='small'>Reload</Button>
        <Button size='small' disabled>Reset</Button>
        <Button size='small' disabled>Custom Sandbox</Button>
        <Button size='small'>Open Isolated</Button>
      </div>
      <code css={styles.location}>
        @arwes/animator / Animator / staggering
      </code>
    </nav>
  );
};

export { Toolbar };
