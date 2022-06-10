/** @jsx jsx */
import { jsx, useTheme } from '@emotion/react';
import { ReactElement, useMemo } from 'react';
import { useStore } from 'effector-react';

import { NT_ICONS, NT_BREAKPOINTS as breakpoints } from '../../../constants';
import { cx, useMediaQuery } from '../../utils';
import {
  $setup,
  $router,
  $transpilation,
  sendReload,
  sendReset,
  sendCustomize,
  sendIsolate,
  sendCopy
} from '../../services';
import { Button, Icon } from '../../ui';
import { createStyles } from './Toolbar.styles';

interface ToolbarProps {
  className?: string;
}

const { mdiReload, mdiBackupRestore, mdiPencil, mdiTestTube, mdiContentCopy } =
  NT_ICONS;

const Toolbar = (props: ToolbarProps): ReactElement => {
  const { className } = props;

  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const isMDMediumUp = useMediaQuery(breakpoints.medium.up);

  const setup = useStore($setup);
  const router = useStore($router);
  const transpilation = useStore($transpilation);

  const { optionsControls, optionsBooleans } = router;
  const hasEditorError = !!transpilation.error;

  return (
    <nav className={cx('toolbar', className)} css={styles.root}>
      <div className="toolbar__options" css={styles.options}>
        <Button
          css={styles.option}
          size="small"
          title="Reload preview"
          disabled={!optionsBooleans.preview || hasEditorError}
          onClick={() => sendReload()}
        >
          <Icon path={mdiReload} />
          <span css={styles.optionLabel}>Reload</span>
        </Button>

        <Button
          css={styles.option}
          size="small"
          title="Reset predefined sandbox source code"
          disabled={optionsControls.type === 'custom'}
          onClick={() => sendReset()}
        >
          <Icon path={mdiBackupRestore} />
          <span css={styles.optionLabel}>Reset</span>
        </Button>

        <Button
          css={styles.option}
          size="small"
          disabled={optionsControls.type === 'custom'}
          title="Make custom sandbox from current source code"
          onClick={() => sendCustomize()}
        >
          <Icon path={mdiPencil} />
          <span css={styles.optionLabel}>Customize</span>
        </Button>

        <Button
          css={styles.option}
          size="small"
          title="Make a copy of the current sandbox and open preview in an independent isolated window"
          disabled={!optionsBooleans.preview || hasEditorError}
          onClick={() => sendIsolate()}
        >
          <Icon path={mdiTestTube} />
          <span css={styles.optionLabel}>Isolate</span>
        </Button>

        <Button
          css={styles.option}
          size="small"
          title="Copy source code"
          onClick={() => sendCopy()}
        >
          <Icon path={mdiContentCopy} />
          <span css={styles.optionLabel}>Copy</span>
        </Button>
      </div>
      <div className="toolbar__custom" css={styles.custom}>
        {isMDMediumUp ? setup.toolbar?.medium : setup.toolbar?.small}
      </div>
    </nav>
  );
};

export { Toolbar };
