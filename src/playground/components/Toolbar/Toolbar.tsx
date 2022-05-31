/** @jsx jsx */
import { jsx, useTheme } from '@emotion/react';
import { ReactElement, useMemo } from 'react';
import Icon from '@mdi/react';

import { NT_ICONS } from '../../../constants';
import { cx } from '../../utils/cx';
import { useRouterState } from '../../utils/useRouterState';
import { useStore } from '../../utils/useStore';
import { Button } from '../Button';
import { createStyles } from './Toolbar.styles';

interface ToolbarProps {
  className?: string;
}

const { mdiReload, mdiBackupRestore, mdiPencil, mdiTestTube, mdiContentCopy } =
  NT_ICONS;

const Toolbar = (props: ToolbarProps): ReactElement => {
  const { className } = props;

  const { optionsControls, optionsBooleans } = useRouterState();
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const transpilation = useStore((state) => state.transpilation);
  const trigger = useStore((state) => state.trigger);

  const hasEditorError = !!transpilation.error;

  return (
    <nav className={cx('toolbar', className)} css={styles.root}>
      <div css={styles.options}>
        <Button
          css={styles.option}
          size="small"
          title="Reload preview"
          disabled={!optionsBooleans.preview || hasEditorError}
          onClick={() => trigger('reload')}
        >
          <Icon css={styles.optionIcon} path={mdiReload} />
          <span css={styles.optionLabel}>Reload</span>
        </Button>

        <Button
          css={styles.option}
          size="small"
          title="Reset predefined sandbox source code"
          disabled={optionsControls.type === 'custom'}
          onClick={() => trigger('resetPredefinedSandboxCode')}
        >
          <Icon css={styles.optionIcon} path={mdiBackupRestore} />
          <span css={styles.optionLabel}>Reset</span>
        </Button>

        <Button
          css={styles.option}
          size="small"
          disabled={optionsControls.type === 'custom'}
          title="Make custom sandbox from current source code"
          onClick={() => trigger('customSandbox')}
        >
          <Icon css={styles.optionIcon} path={mdiPencil} />
          <span css={styles.optionLabel}>Customize</span>
        </Button>

        <Button
          css={styles.option}
          size="small"
          title="Make a copy of the current sandbox and open preview in an independent isolated window"
          disabled={!optionsBooleans.preview || hasEditorError}
          onClick={() => trigger('openIsolated')}
        >
          <Icon css={styles.optionIcon} path={mdiTestTube} />
          <span css={styles.optionLabel}>Isolate</span>
        </Button>

        <Button
          css={styles.option}
          size="small"
          title="Copy source code"
          onClick={() => trigger('copyCode')}
        >
          <Icon css={styles.optionIcon} path={mdiContentCopy} />
          <span css={styles.optionLabel}>Copy</span>
        </Button>
      </div>
    </nav>
  );
};

export { Toolbar };
