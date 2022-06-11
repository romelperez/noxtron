/** @jsx jsx */
import { jsx, useTheme, Global } from '@emotion/react';
import { Fragment, ReactElement, ReactNode, useMemo } from 'react';

import { createStyles } from './MainLayout.styles';

interface MainLayoutProps {
  header?: ReactNode | boolean;
  main?: ReactNode | boolean;
  leftView?: ReactNode | boolean;
  workspaceHeader?: ReactNode | boolean;
  panels?: ReactNode[];
  footer?: ReactNode | boolean;
}

const MainLayout = (props: MainLayoutProps): ReactElement => {
  const {
    header,
    main,
    leftView,
    workspaceHeader,
    panels = [],
    footer
  } = props;

  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <Fragment>
      <Global styles={styles.global} />
      <div className="app" css={styles.root}>
        <div className="app__header" css={styles.header}>
          {header}
        </div>

        <main className="app__main" css={styles.main}>
          {main}

          {!!leftView && (
            <div className="app__leftView" css={styles.leftView}>
              {leftView}
            </div>
          )}

          {!!panels.length && (
            <div className="app__workspace" css={styles.workspace}>
              {!!workspaceHeader && (
                <div
                  className="app__workspaceHeader"
                  css={styles.workspaceHeader}
                >
                  {workspaceHeader}
                </div>
              )}

              <div className="app__panels" css={styles.panels}>
                {panels.map((panel, index) => (
                  <div key={index} className="app__panel" css={styles.panel}>
                    {panel}
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>

        {!!footer && (
          <div className="app__footer" css={styles.footer}>
            {footer}
          </div>
        )}
      </div>
    </Fragment>
  );
};

export type { MainLayoutProps };
export { MainLayout };
