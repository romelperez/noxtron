/** @jsx jsx */
import { jsx, useTheme } from '@emotion/react';
import { ReactElement, useEffect, useMemo, useRef, useCallback } from 'react';
import * as monaco from 'monaco-editor';
import MonacoEditor from '@monaco-editor/react';

import type { Store } from '../../../types';
import { cx } from '../../../utils/cx';
import { useRouterState } from '../../../utils/useRouterState';
import { useStore } from '../../../utils/useStore';
import { createStyles } from './Editor.styles';
import { useMediaQuery } from '../../../utils/useMediaQuery';

// TODO: Handle code errors.
// TODO: Update URL when user changes editor code with debounce time.

interface EditorProps {
  className?: string;
}

const Editor = (props: EditorProps): ReactElement => {
  const { className } = props;

  const routerState = useRouterState();
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const store = useStore();
  const isBreakpointMediumUp = useMediaQuery(theme.breakpoints.medium.up);

  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const storeRef = useRef<Store>(store);

  storeRef.current = store;

  const onEditorMount = useCallback(
    (newEditorRef: monaco.editor.IStandaloneCodeEditor) => {
      editorRef.current = newEditorRef;

      const { fontFamily, fontSize, fontWeight } = theme.typography.code(1);

      newEditorRef.updateOptions({
        readOnly: !isBreakpointMediumUp,
        domReadOnly: !isBreakpointMediumUp,
        tabSize: 2,
        showDeprecated: true,
        showUnused: true,
        scrollBeyondLastLine: false,
        autoDetectHighContrast: false,
        padding: {
          top: theme.space(4),
          bottom: theme.space(4)
        },
        fontFamily,
        // Assuming fontSize is in pixels, remove the unit name and convert to number.
        fontSize: fontSize
          ? Number(String(fontSize).replace(/[^\d]/g, ''))
          : undefined,
        fontWeight: fontWeight ? String(fontWeight) : undefined
      });

      newEditorRef.setValue(storeRef.current.sandboxSelected?.code || '');

      editorRef.current?.updateOptions({
        theme: theme.colorScheme === 'dark' ? 'vs-dark' : 'vs'
      });
    },
    []
  );

  useEffect(() => {
    // TODO: Update editor with new sandbox language.
    if (store?.sandboxSelected && editorRef.current) {
      const { code = '' } = store.sandboxSelected;
      editorRef.current.setValue(code);
    }
  }, [store?.sandboxSelected]);

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

  return (
    <div className={cx('editor', className)} css={styles.root}>
      <MonacoEditor
        className="editor__monaco-editor"
        css={styles.editor}
        width="100%"
        height="100%"
        theme="vs-dark"
        defaultLanguage="typescript"
        onMount={onEditorMount}
      />
    </div>
  );
};

export { Editor };
