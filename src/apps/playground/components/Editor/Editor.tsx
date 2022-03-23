/** @jsx jsx */
import { jsx, useTheme } from '@emotion/react';
import { ReactElement, useEffect, useMemo, useRef } from 'react';
import debounce from 'lodash/debounce';
import * as monaco from 'monaco-editor';

import { cx } from '../../../utils/cx';
import { useRouterState } from '../../../utils/useRouterState';
import { useStore } from '../../../utils/useStore';
import { createStyles } from './Editor.styles';
import { useMediaQuery } from '../../../utils/useMediaQuery';

// TODO: Handle code errors.
// TODO: Update URL when user changes editor code with debounce time.

interface EditorProps {
  className?: string
}

const Editor = (props: EditorProps): ReactElement => {
  const { className } = props;

  const routerState = useRouterState();
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const store = useStore();
  const isBreakpointMediumUp = useMediaQuery(theme.breakpoints.medium.up);

  const editorElementRef = useRef<HTMLDivElement>(null);
	const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

	useEffect(() => {
    const editorElement = editorElementRef.current as HTMLDivElement;
    const { fontFamily, fontSize, fontWeight } = theme.typography.code(1);

    editorRef.current = monaco.editor.create(editorElement, {
      readOnly: !isBreakpointMediumUp,
      domReadOnly: !isBreakpointMediumUp,
      value: '',
      language: 'javascript',
      tabSize: 2,
      showDeprecated: true,
      showUnused: true,
      scrollBeyondLastLine: false,
      theme: theme.colorScheme === 'dark' ? 'vs-dark' : 'vs',
      autoDetectHighContrast: false,
      padding: {
        top: theme.space(4),
        bottom: theme.space(4)
      },
      fontFamily,
      // Assuming fontSize is in pixels, remove the unit name and convert to number.
      fontSize: fontSize ? Number(String(fontSize).replace(/[^\d]/g, '')) : undefined,
      fontWeight: fontWeight ? String(fontWeight) : undefined
    });

    const onResize = debounce((): void => {
      editorRef.current?.layout();
    }, 100);

    window.addEventListener('resize', onResize);

		return () => {
      window.removeEventListener('resize', onResize);
      editorRef.current?.dispose();
		};
	}, []);

  useEffect(() => {
    editorRef.current?.updateOptions({
      theme: theme.colorScheme === 'dark' ? 'vs-dark' : 'vs'
    });
  }, [theme]);

  useEffect(() => {
    editorRef.current?.layout();
  }, [routerState]);

  useEffect(() => {
    const onCopy = (): void => {
      window.navigator.clipboard.writeText(editorRef.current?.getValue() || '');
    };

    const onCustomSandbox = (): void => {
      routerState.setOptions({
        type: 'custom',
        code: editorRef.current?.getValue() || ''
      });
    };

    store.subscribe('copyCode', onCopy);
    store.subscribe('customSandbox', onCustomSandbox);

    return () => {
      store.unsubscribe('copyCode', onCopy);
      store.unsubscribe('customSandbox', onCustomSandbox);
    };
  }, [routerState, store]);

  useEffect(() => {
    // TODO: Update editor with new sandbox language.
    if (store?.sandboxSelected && editorRef.current) {
      const { code = '' } = store.sandboxSelected;
      editorRef.current.setValue(code);
    }
  }, [store?.sandboxSelected]);

  return (
    <div
      className={cx('editor', className)}
      css={styles.root}
    >
      <div
        ref={editorElementRef}
        css={styles.editor}
      />
    </div>
  );
};

export { Editor };
