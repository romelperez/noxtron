/** @jsx jsx */
import { jsx, useTheme } from '@emotion/react';
import { ReactElement, useEffect, useMemo, useRef } from 'react';

import type { NTStyles, NTSandbox } from '../../../types';
import { NT_BREAKPOINTS as breakpoints } from '../../../constants';
import { cx } from '../../utils/cx';
import { useMediaQuery } from '../../utils/useMediaQuery';
import { useRouterState } from '../../utils/useRouterState';
import { useStore } from '../../utils/useStore';
import { StatusMessage } from '../StatusMessage';
import { Slider } from '../Slider';
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
    const timeoutId = setTimeout(() => {
      if (buttonActiveElementRef.current) {
        buttonActiveElementRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
    }, 0);
    return () => {
      clearTimeout(timeoutId);
    };
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

const sliderWidths = {
  cacheKey: 'noxtron-explorer-width',
  initial: 300,
  min: 250,
  max: 400
};

const formatSliderWidth = (width: number): number => {
  const { min, max } = sliderWidths;
  return Math.max(min, Math.min(max, width));
};

const getSliderWidthCache = (): number | null => {
  const initialCache = window.localStorage.getItem(sliderWidths.cacheKey);
  return Number.isFinite(Number(initialCache)) ? Number(initialCache) : null;
};

const setSliderWidthCache = (width: number): void => {
  const { cacheKey } = sliderWidths;
  window.localStorage.setItem(cacheKey, String(width));
};

const Explorer = (props: ExplorerProps): ReactElement => {
  const { className } = props;

  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const sandboxes = useStore((state) => state.sandboxes);
  const isMDMediumUp = useMediaQuery(breakpoints.medium.up);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current as HTMLDivElement;

    if (isMDMediumUp) {
      const widthInitial = getSliderWidthCache() ?? sliderWidths.initial;
      const width = formatSliderWidth(widthInitial);
      element.style.width = `${width}px`;
    } else {
      element.style.width = '';
    }
  }, [isMDMediumUp]);

  return (
    <aside
      ref={elementRef}
      className={cx('explorer', className)}
      css={styles.root}
    >
      <div css={styles.container}>
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
      </div>

      {isMDMediumUp && (
        <Slider
          onChange={(offset) => {
            const element = elementRef.current as HTMLDivElement;
            const width = formatSliderWidth(element.offsetWidth + offset);
            element.style.width = `${width}px`;
            setSliderWidthCache(width);
          }}
        />
      )}
    </aside>
  );
};

export { Explorer };
