/** @jsx jsx */
import { jsx } from '@emotion/react';
import { ReactElement, useEffect, useMemo, useRef } from 'react';

import { convertLocationSearchToString } from '../../../utils/convertLocationSearchToString';
import { encodeURLParameter } from '../../../utils/encodeURLParameter';

import { cx } from '../../utils/cx';
import { useStore } from '../../utils/useStore';
import { usePlaygroundSettings } from '../../utils/usePlaygroundSettings';
import { createStyles } from './Preview.styles';
import { Loading } from '../Loading';

interface PreviewProps {
  className?: string;
}

const Preview = (props: PreviewProps): ReactElement => {
  const { className } = props;

  const styles = useMemo(() => createStyles(), []);
  const { sandboxPath } = usePlaygroundSettings();
  const transpilation = useStore((state) => state.transpilation);
  const subscribe = useStore((state) => state.subscribe);
  const unsubscribe = useStore((state) => state.unsubscribe);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const sandboxURLSearch: string = useMemo(() => {
    const { importsLines, code, error } = transpilation;
    return convertLocationSearchToString({
      importsLines: encodeURLParameter(JSON.stringify(importsLines)),
      code: encodeURLParameter(code),
      error: encodeURLParameter(error)
    });
  }, [transpilation]);

  useEffect(() => {
    const onReload = (): void => {
      iframeRef.current?.contentWindow?.location.reload();
    };

    subscribe('reload', onReload);

    return () => {
      unsubscribe('reload', onReload);
    };
  }, []);

  useEffect(() => {
    const onOpenIsolated = (): void => {
      window.open(
        `${window.location.origin}${sandboxPath}?${sandboxURLSearch}`,
        'sandbox'
      );
    };

    subscribe('openIsolated', onOpenIsolated);

    return () => {
      unsubscribe('openIsolated', onOpenIsolated);
    };
  }, [sandboxURLSearch]);

  return (
    <div className={cx('preview', className)} css={styles.root}>
      {transpilation.isLoading && <Loading full />}

      {!transpilation.isLoading && (
        <iframe
          className="preview__iframe"
          ref={iframeRef}
          css={styles.sandbox}
          src={`${sandboxPath}?${sandboxURLSearch}`}
        />
      )}
    </div>
  );
};

export { Preview };
