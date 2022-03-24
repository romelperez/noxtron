/** @jsx jsx */
import { jsx, useTheme } from '@emotion/react';
import { ReactElement, useMemo } from 'react';

import type { Styles, Sandbox } from '../../../types';
import { cx } from '../../../utils/cx';
import { getUserGlobalSandboxes } from '../../../utils/getUserGlobalSandboxes';
import { useRouterState } from '../../../utils/useRouterState';
import { createStyles } from './Explorer.styles';

interface ExplorerNavListProps {
  styles: Styles;
  items: Sandbox[];
  currentSandboxPath: string[];
}

const ExplorerNavList = (props: ExplorerNavListProps): ReactElement => {
  const { styles, items, currentSandboxPath } = props;

  const { optionsControls, setOptions } = useRouterState();
  const routerSandbox = optionsControls.sandbox;

  return (
    <ul>
      {items.map(({ name, code, children }, index) => {
        const isLink = !!code;
        const itemSandboxPath = [...currentSandboxPath, name];
        const isActive = itemSandboxPath.every(
          (itemSandboxPathFragment, i) =>
            routerSandbox[i] === itemSandboxPathFragment
        );

        return (
          <li key={index}>
            {!isLink && (
              <div css={[styles.item, isActive && styles.itemActive]}>
                {name}
              </div>
            )}
            {!!isLink && (
              <button
                css={[styles.item, styles.link, isActive && styles.linkActive]}
                onClick={(event) => {
                  event.preventDefault();
                  setOptions({
                    type: 'predefined',
                    sandbox: itemSandboxPath
                  });
                }}
              >
                {name}
              </button>
            )}
            {!!children && !!children.length && (
              <ExplorerNavList
                styles={styles}
                items={children}
                currentSandboxPath={itemSandboxPath}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
};

interface ExplorerProps {
  className?: string;
}

const Explorer = (props: ExplorerProps): ReactElement => {
  const { className } = props;

  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const sandboxes = getUserGlobalSandboxes();

  return (
    <aside className={cx('explorer', className)} css={styles.root}>
      <nav css={styles.nav}>
        <ExplorerNavList
          styles={styles}
          items={sandboxes}
          currentSandboxPath={[]}
        />
      </nav>
    </aside>
  );
};

export { Explorer };
