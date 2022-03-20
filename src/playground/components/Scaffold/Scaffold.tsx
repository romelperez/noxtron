import React, { ReactElement, useMemo } from 'react';
import { ThemeProvider, Theme, Global } from '@emotion/react';

import { createTheme } from '@src/utils/createTheme';
import { App } from '../App';
import { createStyles } from './Scaffold.styles';

// @ts-ignore
window.MonacoEnvironment = {
	getWorkerUrl: (_moduleId: any, label: string) => {
    switch (label) {
      case 'json': return '/play/monaco.json.worker.js';
      case 'css':
      case 'scss':
      case 'less': return '/play/monaco.css.worker.js';
      case 'html': return '/play/monaco.html.worker.js';
      case 'typescript':
      case 'javascript': return '/play/monaco.ts.worker.js';
      default: return '/play/monaco.editor.worker.js';
    }
	}
};

const Scaffold = (): ReactElement => {
  const theme: Theme = useMemo(() => createTheme('dark'), []);
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <ThemeProvider theme={theme}>
      <Global styles={styles.global} />
      <App />
    </ThemeProvider>
  );
};

export { Scaffold };
