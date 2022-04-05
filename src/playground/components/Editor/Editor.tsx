// TODO: On sandbox change, it should send scrollbar to top=0 and left=0.
// TODO: Only show editor minimap on large viewport.

/** @jsx jsx */
import { jsx, useTheme } from '@emotion/react';
import { ReactElement, useCallback, useEffect, useMemo, useRef } from 'react';
import * as monaco from 'monaco-editor';
import throttle from 'lodash/throttle';

import type { NTMonacoEditor } from '../../../types';
import { NT_BREAKPOINTS as breakpoints } from '../../../constants';
import { cx } from '../../utils/cx';
import { useMediaQuery } from '../../utils/useMediaQuery';
import { useRouterState } from '../../utils/useRouterState';
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
  const store = useStore();
  const isBreakpointMediumUp = useMediaQuery(breakpoints.medium.up);

  const editorContainerElementRef = useRef<HTMLDivElement>(null);
  const editorElementRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<NTMonacoEditor | null>(null);

  const onResize = useCallback(
    throttle((): void => {
      if (!editorRef.current || !editorContainerElementRef.current) {
        return;
      }
      editorRef.current.layout({
        width: editorContainerElementRef.current.offsetWidth,
        height: editorContainerElementRef.current.offsetHeight
      });
    }, 50),
    []
  );

  useEffect(() => {
    const editorElement = editorElementRef.current as HTMLDivElement;
    const { fontFamily, fontSize, fontWeight } = theme.typography.code(
      isBreakpointMediumUp ? 1 : 2
    );

    editorRef.current = monaco.editor.create(editorElement, {
      model: store.editorModel.model,
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

    window.addEventListener('resize', onResize);

    return () => {
      editorRef.current?.dispose();
      window.removeEventListener('resize', onResize);
    };
  }, []);

  useEffect(() => {
    onResize();
  }, [routerState]);

  useEffect(() => {
    editorRef.current?.updateOptions({
      theme: theme.colorScheme === 'dark' ? 'vs-dark' : 'vs'
    });
  }, [theme]);

  useEffect(() => {
    const onCopy = (): void => {
      window.navigator.clipboard.writeText(store.editorModel.getValue());
    };

    const onCustomSandbox = (): void => {
      routerState.setOptions({
        type: 'custom',
        code: store.editorModel.getValue()
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
