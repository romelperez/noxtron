/** @jsx jsx */
import { jsx, useTheme } from '@emotion/react';
import { ReactElement, useEffect, useMemo, useRef, useState } from 'react';
import { transform } from '@babel/standalone';

import { cx } from '../../../utils/cx';
import { useStore } from '../../../utils/useStore';
import { encodeURLParameter } from '../../../utils/encodeURLParameter';
import { useUserConfig } from '../../utils/useUserConfig';
import { createStyles } from './Preview.styles';

interface PreviewProps {
  className?: string;
}

const Preview = (props: PreviewProps): ReactElement => {
  const { className } = props;

  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const store = useStore();

  const [codeTranspiledEncoded, setCodeTranspiledEncoded] = useState('');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const { sandboxPath } = useUserConfig();

  useEffect(() => {
    const code = store?.sandboxCode || '';
    let codeProcessed = '';

    try {
      const transformation = transform(code, {
        // TODO: Change filetype according to sandbox type.
        filename: 'sandbox.tsx',
        presets: ['env', 'react', 'typescript']
      });
      codeProcessed = transformation?.code || '';

      setCodeTranspiledEncoded(encodeURLParameter(codeProcessed));
      store.setSandboxError('');
    } catch (error: unknown) {
      setCodeTranspiledEncoded('');
      store.setSandboxError(String(error));
      console.error(error);
    }
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
      window.open(
        `${window.location.origin}${sandboxPath}?code=${codeTranspiledEncoded}`,
        'sandbox'
      );
    };

    store.subscribe('openIsolated', onOpenIsolated);

    return () => {
      store.unsubscribe('openIsolated', onOpenIsolated);
    };
  }, [codeTranspiledEncoded]);

  const codeParam = codeTranspiledEncoded;
  const errorParam = encodeURLParameter(store.sandboxError);

  return (
    <div className={cx('preview', className)} css={styles.root}>
      <iframe
        ref={iframeRef}
        css={styles.sandbox}
        src={`${sandboxPath}?code=${codeParam}&error=${errorParam}`}
      />
    </div>
  );
};

export { Preview };
