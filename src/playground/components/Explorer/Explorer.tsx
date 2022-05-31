/** @jsx jsx */
import { jsx, useTheme } from '@emotion/react';
import { ReactElement, useEffect, useMemo, useRef } from 'react';

import type { NTStyles, NTSandbox } from '../../../types';
import { cx } from '../../utils/cx';
import { useRouterState } from '../../utils/useRouterState';
import { useStore } from '../../utils/useStore';
import { StatusMessage } from '../StatusMessage';
import { createStyles } from './Explorer.styles';

interface ExplorerNavListProps {
  styles: NTStyles;
  items: NTSandbox[];
  currentSandboxPath: string[];
}

const ExplorerNavList = (props: ExplorerNavListProps): ReactElement => {
  const { styles, items, currentSandboxPath } = props;

  const { optionsControls, setOptions } = useRouterState();
  const buttonActiveElementRef = useRef<HTMLButtonElement | null>(null);

  const routerSandbox = optionsControls.sandbox;

  useEffect(() => {
    // Wait until all elements are rendered.
    setTimeout(() => {
      if (buttonActiveElementRef.current) {
        buttonActiveElementRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
    }, 0);
  }, []);

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
            {isLink && (
              <button
                ref={isActive ? buttonActiveElementRef : null}
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
  const sandboxes = useStore((state) => state.sandboxes);

  return (
    <aside className={cx('explorer', className)} css={styles.root}>
      <nav css={styles.nav}>
        {!sandboxes.length && (
          <StatusMessage>No sandboxes available.</StatusMessage>
        )}

        {!!sandboxes.length && (
          <ExplorerNavList
            styles={styles}
            items={sandboxes}
            currentSandboxPath={[]}
          />
        )}
      </nav>
    </aside>
  );
};

export { Explorer };
