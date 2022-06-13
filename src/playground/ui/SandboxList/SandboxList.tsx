/** @jsx jsx */
import { jsx, useTheme } from '@emotion/react';
import { ReactElement, useEffect, useMemo, useRef } from 'react';

import type { NTSandbox } from '../../../types';
import { cx } from '../../utils';
import { createStyles } from './SandboxList.styles';

interface SandboxListProps {
  className?: string;
  items: NTSandbox[];
  routerSandbox: string[];
  currentSandboxPath: string[];
  onSelect: (sandboxPath: string[]) => void;
}

const SandboxList = (props: SandboxListProps): ReactElement => {
  const { className, items, routerSandbox, currentSandboxPath, onSelect } =
    props;

  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const buttonActiveElementRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    // Wait until all elements are rendered.
    const timeoutId = setTimeout(() => {
      if (buttonActiveElementRef.current) {
        buttonActiveElementRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
    }, 100);
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <ul className={cx('sandbox-list', className)} css={styles.root}>
      {items.map(({ name, code, children }, index) => {
        const isLink = !!code;
        const itemSandboxPath = [...currentSandboxPath, name];
        const isActive = itemSandboxPath.every(
          (itemSandboxPathFragment, i) =>
            routerSandbox[i] === itemSandboxPathFragment
        );
        const hasChildren = !!children && !!children.length;

        return (
          <li key={index} className="sandbox-list__item">
            {!isLink && (
              <div
                className="sandbox-list__text"
                css={[styles.item, isActive && styles.itemActive]}
              >
                {name}
              </div>
            )}
            {isLink && (
              <button
                ref={isActive && !hasChildren ? buttonActiveElementRef : null}
                className="sandbox-list__link"
                css={[
                  styles.item,
                  styles.link,
                  isActive && styles.linkActive,
                  isActive && !hasChildren && styles.linkSelected
                ]}
                onClick={(event) => {
                  event.preventDefault();
                  onSelect(itemSandboxPath);
                }}
              >
                {name}
              </button>
            )}
            {hasChildren && (
              <SandboxList
                items={children}
                routerSandbox={routerSandbox}
                currentSandboxPath={itemSandboxPath}
                onSelect={onSelect}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
};

export type { SandboxListProps };
export { SandboxList };
