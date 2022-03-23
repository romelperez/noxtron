/** @jsx jsx */
import { jsx, useTheme } from '@emotion/react';
import { ReactElement, useMemo } from 'react';

import { cx } from '../../../utils/cx';
import { useRouterState } from '../../../utils/useRouterState';
import { useStore } from '../../../utils/useStore';
import { Button } from '../Button';
import { createStyles } from './Toolbar.styles';

interface ToolbarProps {
  className?: string
}

const Toolbar = (props: ToolbarProps): ReactElement => {
  const { className } = props;

  const { optionsControls, optionsBooleans } = useRouterState();
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const store = useStore();

  const location = optionsControls.type === 'predefined' ? optionsControls.sandbox.join(' / ') : '';

  return (
    <nav
      className={cx('toolbar', className)}
      css={styles.root}
    >
      <div css={styles.options}>
        <Button
          size='small'
          title='Reload preview'
          disabled={!optionsBooleans.preview}
          onClick={() => store?.trigger('reload')}
        >
          Reload
        </Button>
        <Button
          size='small'
          title='Reset predefined sandbox source code'
          disabled={optionsControls.type === 'custom'}
          onClick={() => store?.trigger('resetPredefinedSandboxCode')}
        >
          Reset
        </Button>
        <Button
          size='small'
          disabled={optionsControls.type === 'custom'}
          title='Make custom sandbox from current source code'
          onClick={() => store?.trigger('customSandbox')}
        >
          Custom Sandbox
        </Button>
        <Button
          size='small'
          title='Open preview in an independent isolated window'
          onClick={() => store?.trigger('openIsolated')}
        >
          Open Isolated
        </Button>
        <Button
          size='small'
          title='Copy source code'
          onClick={() => store?.trigger('copyCode')}
        >
          Copy Code
        </Button>
        <Button
          size='small'
          title='Copy playground URL'
          onClick={() => {
            window.navigator.clipboard.writeText(window.location.href);
          }}
        >
          Copy URL
        </Button>
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