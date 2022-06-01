/** @jsx jsx */
import { jsx, useTheme } from '@emotion/react';
import { ReactElement, useMemo } from 'react';
import Icon from '@mdi/react';

import { NT_ICONS, NT_BREAKPOINTS as breakpoints } from '../../../constants';
import { cx } from '../../utils/cx';
import { useMediaQuery } from '../../utils/useMediaQuery';
import { usePlaygroundSettings } from '../../utils/usePlaygroundSettings';
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
  const { toolbar } = usePlaygroundSettings();
  const transpilation = useStore((state) => state.transpilation);
  const trigger = useStore((state) => state.trigger);
  const isMDMediumUp = useMediaQuery(breakpoints.medium.up);

  const hasEditorError = !!transpilation.error;

  return (
    <nav className={cx('toolbar', className)} css={styles.root}>
      <div className="toolbar__options" css={styles.options}>
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
      <div className="toolbar__custom" css={styles.custom}>
        {isMDMediumUp ? toolbar?.medium : toolbar?.small}
      </div>
    </nav>
  );
};

export { Toolbar };
