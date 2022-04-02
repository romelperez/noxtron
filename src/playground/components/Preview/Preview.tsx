/** @jsx jsx */
import { jsx, useTheme } from '@emotion/react';
import { ReactElement, useEffect, useMemo, useRef } from 'react';

import { convertLocationSearchToString } from '../../../utils/convertLocationSearchToString';
import { encodeURLParameter } from '../../../utils/encodeURLParameter';

import { cx } from '../../utils/cx';
import { useStore } from '../../utils/useStore';
import { usePlaygroundSettings } from '../../utils/usePlaygroundSettings';
import { createStyles } from './Preview.styles';

interface PreviewProps {
  className?: string;
}

const Preview = (props: PreviewProps): ReactElement => {
  const { className } = props;

  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const store = useStore();
  const { sandboxPath } = usePlaygroundSettings();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const sandboxURLSearch: string = useMemo(() => {
    const { importsLines, code, error } = store.sandboxTranspilation;
    return convertLocationSearchToString({
      importsLines: encodeURLParameter(JSON.stringify(importsLines)),
      code: encodeURLParameter(code),
      error: encodeURLParameter(error)
    });
  }, [store.sandboxTranspilation]);

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
        `${window.location.origin}${sandboxPath}?${sandboxURLSearch}`,
        'sandbox'
      );
    };

    store.subscribe('openIsolated', onOpenIsolated);

    return () => {
      store.unsubscribe('openIsolated', onOpenIsolated);
    };
  }, [sandboxURLSearch]);

  return (
    <div className={cx('preview', className)} css={styles.root}>
      <iframe
        className="preview__iframe"
        ref={iframeRef}
        css={styles.sandbox}
        src={`${sandboxPath}?${sandboxURLSearch}`}
      />
    </div>
  );
};

export { Preview };
