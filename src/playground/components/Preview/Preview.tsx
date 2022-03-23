/** @jsx jsx */
import { jsx, useTheme } from '@emotion/react';
import { ReactElement, useMemo } from 'react';
import { transform } from '@babel/standalone';

import { cx } from '@src/utils/cx';
import { useStore } from '@src/utils/useStore';
import { createStyles } from './Preview.styles';

interface PreviewProps {
  className?: string
}

const Preview = (props: PreviewProps): ReactElement => {
  const { className } = props;

  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const store = useStore();

  const codeEncoded = useMemo(() => {
    const code = store?.sandboxCode || '';
    const transformation = transform(code, {
      filename: 'sandbox.tsx',
      presets: ['env', 'react', 'typescript']
    });
    const codeProcessed = transformation?.code || '';
    return window.encodeURI(window.btoa(codeProcessed));
  }, [store?.sandboxCode]);

  return (
    <div
      className={cx('preview', className)}
      css={styles.root}
    >
      <iframe
        css={styles.sandbox}
        src={`/play/sandbox/?code=${codeEncoded}`}
      />
    </div>
  );
};

export { Preview };
