/** @jsx jsx */
import { jsx, useTheme } from '@emotion/react';
import { ReactElement, useEffect, useMemo, useRef } from 'react';
import { useStore, useStoreMap } from 'effector-react';

import { NT_BREAKPOINTS as breakpoints } from '../../../constants';
import { cx, useMediaQuery } from '../../utils';
import { $router, $dependencies, sendRoute } from '../../services';
import { StatusMessage, Slider, SandboxList } from '../../ui';
import { createStyles } from './Explorer.styles';

interface ExplorerProps {
  className?: string;
}

const sliderWidths = {
  cacheKey: 'noxtron-explorer-width',
  initial: 300,
  min: 250,
  max: 500
};

const getSliderWidthCache = (): number | null => {
  const initialCache = window.localStorage.getItem(sliderWidths.cacheKey);
  if (!initialCache) {
    return null;
  }
  return Number.isFinite(Number(initialCache)) ? Number(initialCache) : null;
};

const setSliderWidthCache = (width: number | null): void => {
  const { cacheKey } = sliderWidths;
  if (width === null) {
    window.localStorage.removeItem(cacheKey);
  } else {
    window.localStorage.setItem(cacheKey, String(width));
  }
};

const Explorer = (props: ExplorerProps): ReactElement => {
  const { className } = props;

  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const router = useStore($router);
  const sandboxes = useStoreMap($dependencies, (state) => state.sandboxes);
  const isMQMediumUp = useMediaQuery(breakpoints.medium.up);
  const elementRef = useRef<HTMLDivElement>(null);

  const setSliderWidth = (value: number | null): void => {
    const element = elementRef.current;

    if (!element) {
      return;
    }

    if (value === null) {
      element.style.width = '';
    } else {
      const { min, max } = sliderWidths;
      const width = Math.max(min, Math.min(max, value));
      element.style.width = `${width}px`;
    }
  };

  useEffect(() => {
    if (isMQMediumUp) {
      const widthInitial = getSliderWidthCache() ?? sliderWidths.initial;
      setSliderWidth(widthInitial);
    }

    return () => {
      setSliderWidth(null);
    };
  }, [isMQMediumUp]);

  return (
    <aside
      ref={elementRef}
      className={cx('explorer', className)}
      css={styles.root}
    >
      <div className="explorer__container" css={styles.container}>
        <nav className="explorer__nav" css={styles.nav}>
          {!sandboxes.length && (
            <StatusMessage>No sandboxes available.</StatusMessage>
          )}

          {!!sandboxes.length && (
            <SandboxList
              items={sandboxes}
              routerSandbox={router.optionsControls.sandbox}
              currentSandboxPath={[]}
              onSelect={(newSandboxPath) => {
                sendRoute({
                  type: 'predefined',
                  sandbox: newSandboxPath
                });
              }}
            />
          )}
        </nav>
      </div>

      {isMQMediumUp && (
        <Slider
          position="right"
          onChange={(offset) => {
            const element = elementRef.current as HTMLDivElement;
            const width = element.offsetWidth + offset;
            setSliderWidth(width);
            setSliderWidthCache(width);
          }}
          onReset={() => {
            setSliderWidth(sliderWidths.initial);
            setSliderWidthCache(null);
          }}
        />
      )}
    </aside>
  );
};

export { Explorer };
