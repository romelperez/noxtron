/** @jsx jsx */
import { jsx, useTheme, Global } from '@emotion/react';
import { Fragment, ReactElement, useMemo } from 'react';
import { useStore } from 'effector-react';

import { NT_BREAKPOINTS as breakpoints } from '../../../constants';
import { useMediaQuery } from '../../utils';
import { $dependencies, $router } from '../../stores';
import { Loading, StatusMessage } from '../../ui';

import { Header } from '../Header';
import { Explorer } from '../Explorer';
import { Toolbar } from '../Toolbar';
import { Editor } from '../Editor';
import { Preview } from '../Preview';
import { Links } from '../Links';
import { createStyles } from './App.styles';

const App = (): ReactElement => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const isMQMediumUp = useMediaQuery(breakpoints.medium.up);

  const router = useStore($router);
  const dependencies = useStore($dependencies);

  const { optionsBooleans } = router;
  const { isLoading, error } = dependencies;
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

        {(isMQMediumUp || optionsBooleans.explorer) && (
          <Links css={styles.links} />
        )}
      </div>
    </Fragment>
  );
};

export { App };
