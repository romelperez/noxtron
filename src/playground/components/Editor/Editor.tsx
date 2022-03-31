/** @jsx jsx */
import { jsx, useTheme } from '@emotion/react';
import { ReactElement, useEffect, useMemo, useRef, useCallback } from 'react';
import * as monaco from 'monaco-editor';
import MonacoEditor from '@monaco-editor/react';
import debounce from 'lodash/debounce';

import type { NTStore } from '../../../types';
import { NT_BREAKPOINTS as breakpoints } from '../../../constants';
import { cx } from '../../utils/cx';
import { useMediaQuery } from '../../utils/useMediaQuery';
import { useRouterState } from '../../utils/useRouterState';
import { useUserConfig } from '../../utils/useUserConfig';
import { useStore } from '../../utils/useStore';
import { createStyles } from './Editor.styles';

interface EditorProps {
  className?: string;
}

const Editor = (props: EditorProps): ReactElement => {
  const { className } = props;

  const routerState = useRouterState();
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const config = useUserConfig();
  const store = useStore();
  const isBreakpointMediumUp = useMediaQuery(breakpoints.medium.up);

  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const storeRef = useRef<NTStore>(store);

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

      const initialCode =
        routerState.optionsControls.type === 'predefined'
          ? storeRef.current.sandboxSelected?.code || ''
          : routerState.optionsControls.code;
      newEditorRef.setValue(initialCode);

      editorRef.current?.updateOptions({
        theme: theme.colorScheme === 'dark' ? 'vs-dark' : 'vs'
      });
    },
    []
  );

  const onEditorChange = useCallback(
    debounce(() => {
      const code = editorRef.current?.getValue() || '';
      storeRef.current.setSandboxCode(code);
    }, 500),
    []
  );

  useEffect(() => {
    editorRef.current?.setValue(store.sandboxSelected?.code || '');
  }, [store.sandboxSelected]);

  useEffect(() => {
    const newCode = store.sandboxCode;
    const currentCode = editorRef.current?.getValue();
    if (newCode !== currentCode) {
      editorRef.current?.setValue(newCode);
    }
  }, [store.sandboxCode]);

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
        defaultPath={
          config.language === 'javascript' ? 'sandbox.jsx' : 'sandbox.tsx'
        }
        defaultLanguage={config.language}
        onMount={onEditorMount}
        onChange={onEditorChange}
      />
    </div>
  );
};

export { Editor };
