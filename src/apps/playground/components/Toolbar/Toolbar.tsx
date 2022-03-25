/** @jsx jsx */
import { jsx, useTheme } from '@emotion/react';
import { ReactElement, useMemo } from 'react';
import Icon from '@mdi/react';
import {
  mdiReload,
  mdiBackupRestore,
  mdiPencil,
  mdiTestTube,
  mdiContentCopy,
  mdiShareVariant
} from '@mdi/js';

import { cx } from '../../utils/cx';
import { useRouterState } from '../../utils/useRouterState';
import { useStore } from '../../utils/useStore';
import { Button } from '../Button';
import { createStyles } from './Toolbar.styles';

interface ToolbarProps {
  className?: string;
}

const Toolbar = (props: ToolbarProps): ReactElement => {
  const { className } = props;

  const { optionsControls, optionsBooleans } = useRouterState();
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const store = useStore();

  const location =
    optionsControls.type === 'predefined'
      ? optionsControls.sandbox.join(' / ')
      : '';

  return (
    <nav className={cx('toolbar', className)} css={styles.root}>
      <div css={styles.options}>
        <Button
          css={styles.option}
          size="small"
          title="Reload preview"
          disabled={!optionsBooleans.preview || !!store.sandboxError}
          onClick={() => store?.trigger('reload')}
        >
          <Icon css={styles.optionIcon} path={mdiReload} />
          <span css={styles.optionLabel}>Reload</span>
        </Button>
        <Button
          css={styles.option}
          size="small"
          title="Reset predefined sandbox source code"
          disabled={optionsControls.type === 'custom' || !!store.sandboxError}
          onClick={() => store?.trigger('resetPredefinedSandboxCode')}
        >
          <Icon css={styles.optionIcon} path={mdiBackupRestore} />
          <span css={styles.optionLabel}>Reset</span>
        </Button>
        <Button
          css={styles.option}
          size="small"
          disabled={optionsControls.type === 'custom'}
          title="Make custom sandbox from current source code"
          onClick={() => store?.trigger('customSandbox')}
        >
          <Icon css={styles.optionIcon} path={mdiPencil} />
          <span css={styles.optionLabel}>Custom Sandbox</span>
        </Button>
        <Button
          css={styles.option}
          size="small"
          title="Open preview in an independent isolated window"
          disabled={!!store.sandboxError}
          onClick={() => store?.trigger('openIsolated')}
        >
          <Icon css={styles.optionIcon} path={mdiTestTube} />
          <span css={styles.optionLabel}>Open Isolated</span>
        </Button>
        <Button
          css={styles.option}
          size="small"
          title="Copy source code"
          onClick={() => store?.trigger('copyCode')}
        >
          <Icon css={styles.optionIcon} path={mdiContentCopy} />
          <span css={styles.optionLabel}>Copy Code</span>
        </Button>
        <Button
          css={styles.option}
          size="small"
          title="Copy playground URL"
          onClick={() => {
            window.navigator.clipboard.writeText(window.location.href);
          }}
        >
          <Icon css={styles.optionIcon} path={mdiShareVariant} />
          <span css={styles.optionLabel}>Copy URL</span>
        </Button>
      </div>
      {!!location && <code css={styles.location}>{location}</code>}
    </nav>
  );
};

export { Toolbar };
