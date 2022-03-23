/** @jsx jsx */
import { jsx, useTheme } from '@emotion/react';
import { ReactElement, useEffect, useMemo, useRef } from 'react';
import { transform } from '@babel/standalone';

import { cx } from '@src/utils/cx';
import { useStore } from '@src/utils/useStore';
import { encodeSourceCode } from '@src/utils/encodeSourceCode';
import { createStyles } from './Preview.styles';

interface PreviewProps {
  className?: string
}

const Preview = (props: PreviewProps): ReactElement => {
  const { className } = props;

  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const store = useStore();

  const iframeRef = useRef<HTMLIFrameElement>(null);

  const codeTranspiledEncoded = useMemo(() => {
    const code = store?.sandboxCode || '';
    const transformation = transform(code, {
      filename: 'sandbox.tsx',
      presets: ['env', 'react', 'typescript']
    });
    const codeProcessed = transformation?.code || '';

    return encodeSourceCode(codeProcessed);
  }, [store?.sandboxCode]);

  useEffect(() => {
    const onReload = (): void => {
      iframeRef.current?.contentWindow?.location.reload();
    };

    store.subscribe('reload', onReload);

    return () => {
      store.unsubscribe('reload', onReload);
    };
  }, []);

  useEffect(() => {
    const onOpenIsolated = (): void => {
      window.open(`${window.location.origin}/play/sandbox/?code=${codeTranspiledEncoded}`, 'sandbox');
    };

    store.subscribe('openIsolated', onOpenIsolated);

    return () => {
      store.unsubscribe('openIsolated', onOpenIsolated);
    };
  }, [codeTranspiledEncoded]);

  return (
    <div
      className={cx('preview', className)}
      css={styles.root}
    >
      <iframe
        ref={iframeRef}
        css={styles.sandbox}
        src={`/play/sandbox/?code=${codeTranspiledEncoded}`}
      />
    </div>
  );
};

export { Preview };
