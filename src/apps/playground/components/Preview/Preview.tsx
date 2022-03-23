/** @jsx jsx */
import { jsx, useTheme } from '@emotion/react';
import { ReactElement, useEffect, useMemo, useRef } from 'react';
import { transform } from '@babel/standalone';

import { cx } from '../../../utils/cx';
import { useStore } from '../../../utils/useStore';
import { encodeSourceCode } from '../../../utils/encodeSourceCode';
import { getUserGlobalConfig } from '../../../utils/getUserGlobalConfig';
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

  const config = getUserGlobalConfig();

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
      window.open(`${window.location.origin}${config.sandboxPath}?code=${codeTranspiledEncoded}`, 'sandbox');
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
        src={`${config.sandboxPath}?code=${codeTranspiledEncoded}`}
      />
    </div>
  );
};

export { Preview };
