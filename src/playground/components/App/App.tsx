/** @jsx jsx */
import { jsx, useTheme } from '@emotion/react';
import { ReactElement, useMemo } from 'react';

import { Header } from '../Header';
import { Explorer } from '../Explorer';
import { Toolbar } from '../Toolbar';
import { Editor } from '../Editor';
import { Preview } from '../Preview';
import { Footer } from '../Footer';
import { createStyles } from './App.styles';

const App = (): ReactElement => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <div className='app' css={styles.root}>
      <Header css={styles.header} />
      <main css={styles.main}>
        <Explorer css={styles.explorer} />
        <div css={styles.workspace}>
          <Toolbar css={styles.toolbar} />
          <div css={styles.panels}>
            <Editor css={[styles.panel, styles.panelEditor]} />
            <Preview css={[styles.panel, styles.panelPreview]} />
          </div>
        </div>
      </main>
      <Footer css={styles.footer} />
    </div>
  );
};

export { App };
