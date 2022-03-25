/** @jsx jsx */
import { jsx, useTheme } from '@emotion/react';
import { ReactElement, useEffect, useMemo, useRef, useState } from 'react';
import { transform } from '@babel/standalone';

import { cx } from '../../utils/cx';
import { useStore } from '../../utils/useStore';
import { convertLocationSearchToString } from '../../../utils/convertLocationSearchToString';
import { encodeURLParameter } from '../../../utils/encodeURLParameter';
import { useUserConfig } from '../../utils/useUserConfig';
import { createStyles } from './Preview.styles';

interface SandboxSearchParams {
  importsLines: string[];
  code: string;
  error: string;
}

const convertImportsToRefs = (
  src: string
): { code: string; importsLines: string[] } => {
  const importsLines: string[] = [];
  const code = src
    .split(/\r?\n/)
    .map((line) => {
      if (/^\s*import\s/.test(line)) {
        importsLines.push(line.trim());
        return '__NOXTRON_DEAD_LINE__';
      }
      return line;
    })
    .filter((line) => line !== '__NOXTRON_DEAD_LINE__')
    .join('\n');
  return { code, importsLines };
};

const sandboxSearchParamsInitial: SandboxSearchParams = {
  importsLines: [],
  code: '',
  error: ''
};

interface PreviewProps {
  className?: string;
}

const Preview = (props: PreviewProps): ReactElement => {
  const { className } = props;

  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const store = useStore();

  const [sandboxSearchParams, setSandboxSearchParams] =
    useState<SandboxSearchParams>(sandboxSearchParamsInitial);

  const iframeRef = useRef<HTMLIFrameElement>(null);

  const sandboxURLSearch: string = useMemo(() => {
    const { importsLines, code, error } = sandboxSearchParams;
    return convertLocationSearchToString({
      importsLines: encodeURLParameter(JSON.stringify(importsLines)),
      code: encodeURLParameter(code),
      error: encodeURLParameter(error)
    });
  }, [sandboxSearchParams]);

  const { sandboxPath } = useUserConfig();

  useEffect(() => {
    const rawCode = store?.sandboxCode || '';
    const { importsLines, code: codeWithRefs } = convertImportsToRefs(rawCode);

    try {
      const transformation = transform(codeWithRefs, {
        // TODO: Change filetype according to sandbox type.
        filename: 'sandbox.tsx',
        presets: ['env', 'react', 'typescript']
      });
      const codeProcessed = transformation?.code || '';

      setSandboxSearchParams({
        importsLines,
        code: codeProcessed,
        error: ''
      });
    } catch (error: unknown) {
      setSandboxSearchParams({
        importsLines: [],
        code: '',
        error: String(error)
      });

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
