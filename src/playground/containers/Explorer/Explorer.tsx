/** @jsx jsx */
import { jsx, useTheme } from '@emotion/react';
import { ReactElement, useEffect, useMemo, useRef } from 'react';

import { NT_BREAKPOINTS as breakpoints } from '../../../constants';
import { cx } from '../../utils/cx';
import { useMediaQuery } from '../../utils/useMediaQuery';
import { useRouterState } from '../../utils/useRouterState';
import { useStore } from '../../utils/useStore';
import { StatusMessage } from '../../ui/StatusMessage';
import { Slider } from '../../ui/Slider';
import { SandboxList } from '../../ui/SandboxList';
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
  const { optionsControls, setOptions } = useRouterState();
  const sandboxes = useStore((state) => state.sandboxes);
  const isMDMediumUp = useMediaQuery(breakpoints.medium.up);
  const elementRef = useRef<HTMLDivElement>(null);

  const setSliderWidth = (value: number | null): void => {
    const element = elementRef.current as HTMLDivElement;

    if (value === null) {
      element.style.width = '';
    } else {
      const { min, max } = sliderWidths;
      const width = Math.max(min, Math.min(max, value));
      element.style.width = `${width}px`;
    }
  };

  useEffect(() => {
    if (isMDMediumUp) {
      const widthInitial = getSliderWidthCache() ?? sliderWidths.initial;
      setSliderWidth(widthInitial);
    }

    return () => {
      setSliderWidth(null);
    };
  }, [isMDMediumUp]);

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
              routerSandbox={optionsControls.sandbox}
              currentSandboxPath={[]}
              onSelect={(newSandboxPath) => {
                setOptions({
                  type: 'predefined',
                  sandbox: newSandboxPath
                });
              }}
            />
          )}
        </nav>
      </div>

      {isMDMediumUp && (
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
