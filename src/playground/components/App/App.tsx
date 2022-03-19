/** @jsx jsx */
import { jsx, useTheme } from '@emotion/react';
import { ReactElement, useMemo } from 'react';

import { createStyles } from './App.styles';

const App = (): ReactElement => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <div css={styles.root}>
      <header css={styles.header}>header</header>
      <main css={styles.main}>
        <aside css={styles.explorer}>explorer</aside>
        <div css={styles.workspace}>
          <nav css={styles.toolbar}>toolbar</nav>
          <div css={styles.panels}>
            <div css={[styles.panel, styles.panelEditor]}>editor</div>
            <div css={[styles.panel, styles.panelPreview]}>
              <iframe
                css={styles.sandbox}
                src="/play/sandbox/?code=cmVuZGVyKDxoMSBzdHlsZT17eyBtYXJnaW46ICIyMHB4IiwgY29sb3I6ICJjeWFuIiwgYmFja2dyb3VuZDogImJsYWNrIiB9fT5IZWxsbyBOb3h0cm9uITwvaDE+KTs="
              />
            </div>
          </div>
        </div>
      </main>
      <footer css={styles.footer}>footer</footer>
    </div>
  );
};

export { App };
