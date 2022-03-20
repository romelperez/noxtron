/** @jsx jsx */
import { jsx, useTheme } from '@emotion/react';
import { Fragment, ReactElement, useMemo } from 'react';

import { useRouterState } from '@src/utils/useRouterState';
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
  const { optionsBooleans } = useRouterState();

  return (
    <div className='app' css={styles.root}>
      <Header css={styles.header} />
      <main css={styles.main}>
        {optionsBooleans.explorer && <Explorer css={styles.explorer} />}
        <div css={styles.workspace}>
          {(optionsBooleans.editor || optionsBooleans.preview) && (
            <Fragment>
              <Toolbar css={styles.toolbar} />
              <div css={styles.panels}>
                {optionsBooleans.editor && <Editor css={[styles.panel, styles.panelEditor]} />}
                {optionsBooleans.preview && <Preview css={[styles.panel, styles.panelPreview]} />}
              </div>
            </Fragment>
          )}
        </div>
      </main>
      <Footer css={styles.footer} />
    </div>
  );
};

export { App };
