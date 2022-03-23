/** @jsx jsx */
import { jsx, useTheme } from '@emotion/react';
import { ReactElement, useMemo } from 'react';

import { cx } from '@src/utils/cx';
import { useRouterState } from '@src/utils/useRouterState';
import { Button } from '../Button';
import { createStyles } from './Toolbar.styles';

interface ToolbarProps {
  className?: string
}

const Toolbar = (props: ToolbarProps): ReactElement => {
  const { className } = props;

  const { optionsControls } = useRouterState();
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const location = optionsControls.type === 'predefined' ? optionsControls.sandbox.join(' / ') : '';

  return (
    <nav
      className={cx('toolbar', className)}
      css={styles.root}
    >
      <div css={styles.options}>
        <Button size='small' disabled>Run</Button>
        <Button size='small' disabled>Reload</Button>
        <Button size='small' disabled>Reset</Button>
        <Button size='small' disabled>Copy</Button>
        <Button size='small' disabled>Custom Sandbox</Button>
        <Button size='small' disabled>Open Isolated</Button>
      </div>
      {!!location && (
        <code css={styles.location}>
          {location}
        </code>
      )}
    </nav>
  );
};

export { Toolbar };
