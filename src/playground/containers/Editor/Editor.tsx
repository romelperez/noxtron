/** @jsx jsx */
import { jsx, useTheme } from '@emotion/react';
import { ReactElement, useCallback, useEffect, useMemo, useRef } from 'react';
import throttle from 'lodash/throttle';
import { useStore, useStoreMap } from 'effector-react';

import type { NTMonacoEditor } from '../../../types';
import { NT_BREAKPOINTS as breakpoints } from '../../../constants';
import { cx, useMediaQuery } from '../../utils';
import { $router, $dependencies } from '../../stores';
import { createStyles } from './Editor.styles';

interface EditorProps {
  className?: string;
}

const Editor = (props: EditorProps): ReactElement => {
  const { className } = props;

  const theme = useTheme();
  const styles = useMemo(() => createStyles(), []);

  const router = useStore($router);
  const monaco = useStoreMap($dependencies, (state) => state.monaco);
  const model = useStoreMap($dependencies, (state) => state.model);

  const isBreakpointMediumUp = useMediaQuery(breakpoints.medium.up);
  const isBreakpointLargeUp = useMediaQuery(breakpoints.large.up);
  const isBreakpointXLargeUp = useMediaQuery(breakpoints.xlarge.up);
  const isBreakpointXXLargeUp = useMediaQuery(breakpoints.xxlarge.up);

  const containerElementRef = useRef<HTMLDivElement>(null);
  const editorElementRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<NTMonacoEditor | null>(null);

  const onResize = useCallback(
    throttle((): void => {
      if (!editorRef.current || !containerElementRef.current) {
        return;
      }
      editorRef.current.layout({
        width: containerElementRef.current.offsetWidth,
        height: containerElementRef.current.offsetHeight
      });
    }, 50),
    []
  );

  useEffect(() => {
    const containerElement = containerElementRef.current as HTMLDivElement;
    const editorElement = editorElementRef.current as HTMLDivElement;
    const { fontFamily, fontSize, fontWeight } = theme.typography.code(
      isBreakpointLargeUp ? 2 : 3
    );

    editorRef.current = monaco.editor.create(editorElement, {
      model: model,
      theme: theme.colorScheme === 'dark' ? 'vs-dark' : 'vs',
      readOnly: !isBreakpointMediumUp,
      domReadOnly: !isBreakpointMediumUp,
      tabSize: 2,
      showDeprecated: true,
      showUnused: true,
      scrollBeyondLastLine: false,
      autoDetectHighContrast: false,
      rulers: isBreakpointXLargeUp ? [80] : [],
      padding: {
        top: theme.space(2),
        bottom: theme.space(2)
      },
      minimap: {
        enabled: isBreakpointXXLargeUp
      },
      fontFamily,
      // Assuming fontSize is in pixels, remove the unit name and convert to number.
      fontSize: fontSize
        ? Number(String(fontSize).replace(/[^\d]/g, ''))
        : undefined,
      fontWeight: fontWeight ? String(fontWeight) : undefined
    });

    window.addEventListener('resize', onResize);

    const containerResizeObserver = new ResizeObserver(onResize);
    containerResizeObserver.observe(containerElement);

    return () => {
      editorRef.current?.dispose();
      window.removeEventListener('resize', onResize);
      containerResizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    onResize();
  }, [router]);

  useEffect(() => {
    editorRef.current?.setScrollPosition({
      scrollLeft: 0,
      scrollTop: 0
    });
  }, [router.optionsControls.type, router.optionsControls.sandbox]);

  useEffect(() => {
    editorRef.current?.updateOptions({
      theme: theme.colorScheme === 'dark' ? 'vs-dark' : 'vs'
    });
  }, [theme]);

  return (
    <div
      ref={containerElementRef}
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
