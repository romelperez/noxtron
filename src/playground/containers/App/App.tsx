/** @jsx jsx */
import { jsx, useTheme, Global } from '@emotion/react';
import { Fragment, ReactElement, useMemo } from 'react';

import { NT_BREAKPOINTS as breakpoints } from '../../../constants';
import { useStore } from '../../services';
import { useRouterState, useMediaQuery } from '../../utils';
import { Loading, StatusMessage } from '../../ui';

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
  const isLoading = useStore((state) => state.isLoading);
  const error = useStore((state) => state.error);
  const isMDMediumUp = useMediaQuery(breakpoints.medium.up);

  const isReady = !isLoading && !error;

  return (
    <Fragment>
      <Global styles={styles.global} />
      <div className="app" css={styles.root}>
        <Header css={styles.header} />
        <main className="app__main" css={styles.main}>
          {isLoading && <Loading />}

          {!!error && <StatusMessage>{error}</StatusMessage>}

          {isReady && (
            <Fragment>
              {optionsBooleans.explorer && <Explorer css={styles.explorer} />}
              {(optionsBooleans.editor || optionsBooleans.preview) && (
                <div className="app__workspace" css={styles.workspace}>
                  <Fragment>
                    <Toolbar css={styles.toolbar} />
                    <div className="app__panels" css={styles.panels}>
                      {optionsBooleans.editor && (
                        <Editor
                          className="app__panel"
                          css={[styles.panel, styles.panelEditor]}
                        />
                      )}
                      {optionsBooleans.preview && (
                        <Preview
                          className="app__panel"
                          css={[styles.panel, styles.panelPreview]}
                        />
                      )}
                    </div>
                  </Fragment>
                </div>
              )}
            </Fragment>
          )}
        </main>
        {(isMDMediumUp || optionsBooleans.explorer) && (
          <Footer css={styles.footer} />
        )}
      </div>
    </Fragment>
  );
};

export { App };
