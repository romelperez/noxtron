/** @jsx jsx */
import { jsx, useTheme } from '@emotion/react';
import { Fragment, ReactElement, useEffect, useMemo, useRef } from 'react';

import { useRouterState } from '../../../utils/useRouterState';
import { useMediaQuery } from '../../../utils/useMediaQuery';
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
  const { options, optionsBooleans, setOptions } = useRouterState();
  const isMQMediumUp = useMediaQuery(theme.breakpoints.medium.up);

  const isFirstRenderRef = useRef<boolean | null>(true);

  useEffect(() => {
    if (!isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
      return;
    }

    const editor = isMQMediumUp ? optionsBooleans.editor ?? true : false;
    const preview = !options.preview ? true : optionsBooleans.preview;
    const dark = !options.dark ? true : optionsBooleans.dark;

    let explorer = isMQMediumUp ? optionsBooleans.explorer ?? true : false;
    if (!(editor || preview)) {
      explorer = true;
    }

    setOptions({ explorer, editor, preview, dark });
  }, []);

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
