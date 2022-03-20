/** @jsx jsx */
import { jsx, useTheme } from '@emotion/react';
import { ReactElement, useEffect, useMemo, useRef } from 'react';
import debounce from 'lodash/debounce';
import * as monaco from 'monaco-editor';

import { cx } from '@src/utils/cx';
import { createStyles } from './Editor.styles';

interface EditorProps {
  className?: string
}

const Editor = (props: EditorProps): ReactElement => {
  const { className } = props;

  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const editorElementRef = useRef<HTMLDivElement>(null);

  const sourceCode = ['function x() {', '\tconsole.log("Hello world!");', '}'].join('\n');

	let editor: monaco.editor.IStandaloneCodeEditor;

	useEffect(() => {
    const editorElement = editorElementRef.current as HTMLDivElement;
    const { fontFamily, fontSize, fontWeight } = theme.typography.code(1);

    editor = monaco.editor.create(editorElement, {
      value: sourceCode,
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
      editor?.layout();
    }, 100);

    window.addEventListener('resize', onResize);

		return () => {
      window.removeEventListener('resize', onResize);
      editor.dispose();
		};
	}, []);

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
