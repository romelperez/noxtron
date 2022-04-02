/** @jsx jsx */
import { jsx, useTheme } from '@emotion/react';
import { ReactElement, useEffect, useMemo, useRef } from 'react';
import * as monaco from 'monaco-editor';
import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';

import type { NTStore } from '../../../types';
import { NT_BREAKPOINTS as breakpoints } from '../../../constants';
import { cx } from '../../utils/cx';
import { useMediaQuery } from '../../utils/useMediaQuery';
import { useRouterState } from '../../utils/useRouterState';
import { usePlaygroundSettings } from '../../utils/usePlaygroundSettings';
import { useStore } from '../../utils/useStore';
import { createStyles } from './Editor.styles';

interface EditorProps {
  className?: string;
}

// TODO: Move model creation to provider.
// TODO: Customize dark theme.
// TODO: Use TypeScript web worker to emit file instead of @babel/standalone.

const Editor = (props: EditorProps): ReactElement => {
  const { className } = props;

  const routerState = useRouterState();
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { codeLanguage } = usePlaygroundSettings();
  const store = useStore();
  const isBreakpointMediumUp = useMediaQuery(breakpoints.medium.up);

  const editorContainerElementRef = useRef<HTMLDivElement>(null);
  const editorElementRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const storeRef = useRef<NTStore>(store);
  const onEditorChangeRef = useRef<monaco.IDisposable | null>(null);

  storeRef.current = store;

  const onResize = throttle((): void => {
    if (!editorRef.current || !editorContainerElementRef.current) {
      return;
    }
    editorRef.current.layout({
      width: editorContainerElementRef.current.offsetWidth,
      height: editorContainerElementRef.current.offsetHeight
    });
  }, 50);

  useEffect(() => {
    const editorElement = editorElementRef.current as HTMLDivElement;
    const codeInitial =
      routerState.optionsControls.type === 'predefined'
        ? storeRef.current.sandboxSelected?.code || ''
        : routerState.optionsControls.code;
    const { fontFamily, fontSize, fontWeight } = theme.typography.code(1);

    const filename = monaco.Uri.parse(
      codeLanguage === 'typescript' ? 'sandbox.tsx' : 'sandbox.jsx'
    );
    const model = monaco.editor.createModel(
      codeInitial,
      codeLanguage,
      filename
    );

    editorRef.current = monaco.editor.create(editorElement, {
      model,
      theme: theme.colorScheme === 'dark' ? 'vs-dark' : 'vs',
      readOnly: !isBreakpointMediumUp,
      domReadOnly: !isBreakpointMediumUp,
      tabSize: 2,
      showDeprecated: true,
      showUnused: true,
      scrollBeyondLastLine: false,
      autoDetectHighContrast: false,
      rulers: isBreakpointMediumUp ? [80] : [],
      padding: {
        top: theme.space(4),
        bottom: theme.space(4)
      },
      minimap: {
        enabled: isBreakpointMediumUp
      },
      fontFamily,
      // Assuming fontSize is in pixels, remove the unit name and convert to number.
      fontSize: fontSize
        ? Number(String(fontSize).replace(/[^\d]/g, ''))
        : undefined,
      fontWeight: fontWeight ? String(fontWeight) : undefined
    });

    onEditorChangeRef.current = editorRef.current.onDidChangeModelContent(
      debounce(() => {
        const code = editorRef.current?.getValue() || '';
        storeRef.current.setSandboxCode(code);
      }, 500)
    );

    window.addEventListener('resize', onResize);

    return () => {
      editorRef.current?.dispose();
      onEditorChangeRef.current?.dispose();
      window.removeEventListener('resize', onResize);
    };
  }, []);

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

  useEffect(() => onResize(), [routerState]);

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
    <div
      ref={editorContainerElementRef}
      className={cx('editor', className)}
      css={styles.root}
    >
      <div
        ref={editorElementRef}
        className="editor__monaco-editor"
        css={styles.editor}
      />
    </div>
  );
};

export { Editor };
