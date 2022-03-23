/** @jsx jsx */
import { jsx, useTheme } from '@emotion/react';
import { ReactElement, useEffect, useMemo, useRef } from 'react';
import debounce from 'lodash/debounce';
import * as monaco from 'monaco-editor';

import { cx } from '@src/utils/cx';
import { useRouterState } from '@src/utils/useRouterState';
import { useStore } from '@src/utils/useStore';
import { createStyles } from './Editor.styles';

interface EditorProps {
  className?: string
}

const Editor = (props: EditorProps): ReactElement => {
  const { className } = props;

  const routerState = useRouterState();
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const store = useStore();

  const editorElementRef = useRef<HTMLDivElement>(null);
	const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

	useEffect(() => {
    const editorElement = editorElementRef.current as HTMLDivElement;
    const { fontFamily, fontSize, fontWeight } = theme.typography.code(1);

    editorRef.current = monaco.editor.create(editorElement, {
      value: '',
      language: 'typescript',
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
    if (!editorRef.current) {
      return;
    }

    editorRef.current.updateOptions({
      theme: theme.colorScheme === 'dark' ? 'vs-dark' : 'vs'
    });
  }, [theme]);

  useEffect(() => {
    editorRef.current?.layout();
  }, [routerState]);

  useEffect(() => {
    const onRun = (): void => {
      const code = editorRef.current?.getValue() || '';
      routerState.setOptions({ type: 'custom', code });
    };

    const onCopy = (): void => {
      const code = editorRef.current?.getValue() || '';
      navigator.clipboard.writeText(code);
    };

    const onCustomSandbox = (): void => {
      routerState.setOptions({
        type: 'custom',
        code: editorRef.current?.getValue() || ''
      });
    };

    store.subscribe('run', onRun);
    store.subscribe('copy', onCopy);
    store.subscribe('customSandbox', onCustomSandbox);

    return () => {
      store.unsubscribe('run', onRun);
      store.unsubscribe('copy', onCopy);
      store.unsubscribe('customSandbox', onCustomSandbox);
    };
  }, [routerState, store]);

  useEffect(() => {
    const { type } = routerState.optionsControls;

    if (type === 'predefined') {
      if (store?.sandboxSelected) {
        const code = store.sandboxSelected.code || '';
        store.setSandboxCode(code);
      }
    }
    else {
      try {
        store?.setSandboxCode(routerState.optionsControls.code);
      } catch (error: unknown) {
        // TODO: Handle error.
        console.error(error);
      }
    }
  }, [routerState, store?.sandboxSelected]);

  useEffect(() => {
    editorRef.current?.setValue(store?.sandboxCode || '');
  }, [store?.sandboxCode]);

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
