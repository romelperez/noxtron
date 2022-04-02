/** @jsx jsx */
import { jsx, useTheme, Global } from '@emotion/react';
import { Fragment, ReactElement, useMemo } from 'react';

import { useRouterState } from '../../utils/useRouterState';
import { Header } from '../Header';
import { Explorer } from '../Explorer';
import { Toolbar } from '../Toolbar';
import { Editor } from '../Editor';
import { Preview } from '../Preview';
import { DesktopFooter } from '../DesktopFooter';
import { createStyles } from './App.styles';

// TODO: Support footer links on mobile.

const App = (): ReactElement => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { optionsBooleans } = useRouterState();

  return (
    <Fragment>
      <Global styles={styles.global} />
      <div className="app" css={styles.root}>
        <Header css={styles.header} />
        <main className="app__content" css={styles.main}>
          {optionsBooleans.explorer && <Explorer css={styles.explorer} />}
          {(optionsBooleans.editor || optionsBooleans.preview) && (
            <div className="app__workspace" css={styles.workspace}>
              <Fragment>
                <Toolbar css={styles.toolbar} />
                <div className="app__panels" css={styles.panels}>
                  {optionsBooleans.editor && (
                    <Editor css={[styles.panel, styles.panelEditor]} />
                  )}
                  {optionsBooleans.preview && (
                    <Preview css={[styles.panel, styles.panelPreview]} />
                  )}
                </div>
              </Fragment>
            </div>
          )}
        </main>
        <DesktopFooter css={styles.desktopFooter} />
      </div>
    </Fragment>
  );
};

export { App };
