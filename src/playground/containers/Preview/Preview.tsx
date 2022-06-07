/** @jsx jsx */
import { jsx } from '@emotion/react';
import { ReactElement, useEffect, useMemo, useRef } from 'react';

import { NT_BREAKPOINTS as breakpoints } from '../../../constants';
import {
  convertLocationSearchToString,
  encodeURLParameter
} from '../../../utils';
import {
  cx,
  useMediaQuery,
  usePlaygroundSettings,
  useRouterState
} from '../../utils';
import { useStore } from '../../services';
import { StatusMessage, Loading, Slider } from '../../ui';
import { createStyles } from './Preview.styles';

interface PreviewProps {
  className?: string;
}

const sliderWidths = {
  cacheKey: 'noxtron-preview-width',
  initial: 0.5,
  min: 0.2,
  max: 0.8
};

const formatSliderWidth = (widthPerc: number): number => {
  const { min, max } = sliderWidths;
  return Math.max(min, Math.min(max, widthPerc));
};

const getSliderWidthCache = (): number | null => {
  const initialCache = window.localStorage.getItem(sliderWidths.cacheKey);
  if (!initialCache) {
    return null;
  }
  return Number.isFinite(Number(initialCache)) ? Number(initialCache) : null;
};

const setSliderWidthCache = (widthPerc: number | null): void => {
  const { cacheKey } = sliderWidths;
  if (widthPerc === null) {
    window.localStorage.removeItem(cacheKey);
  } else {
    window.localStorage.setItem(cacheKey, String(widthPerc));
  }
};

const Preview = (props: PreviewProps): ReactElement => {
  const { className } = props;

  const styles = useMemo(() => createStyles(), []);
  const {
    sandboxPath,
    newCustomSandboxCode = '',
    newCustomSandboxMessage
  } = usePlaygroundSettings();
  const transpilation = useStore((state) => state.transpilation);
  const { optionsBooleans } = useRouterState();
  const subscribe = useStore((state) => state.subscribe);
  const unsubscribe = useStore((state) => state.unsubscribe);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const isMDMediumUp = useMediaQuery(breakpoints.medium.up);
  const elementRef = useRef<HTMLDivElement>(null);

  const isCodeUnchanged =
    transpilation.code.trim() === newCustomSandboxCode.trim();
  const hasSlider = optionsBooleans.editor && isMDMediumUp;

  const sandboxURLSearch: string = useMemo(() => {
    const { importsLines, code, error } = transpilation;
    return convertLocationSearchToString({
      importsLines: encodeURLParameter(JSON.stringify(importsLines)),
      code: encodeURLParameter(code),
      error: encodeURLParameter(error)
    });
  }, [transpilation]);

  useEffect(() => {
    const onReload = (): void => {
      iframeRef.current?.contentWindow?.location.reload();
    };

    subscribe('reload', onReload);

    return () => {
      unsubscribe('reload', onReload);
    };
  }, []);

  useEffect(() => {
    const onOpenIsolated = (): void => {
      window.open(
        `${window.location.origin}${sandboxPath}?${sandboxURLSearch}`,
        'sandbox'
      );
    };

    subscribe('openIsolated', onOpenIsolated);

    return () => {
      unsubscribe('openIsolated', onOpenIsolated);
    };
  }, [sandboxURLSearch]);

  useEffect(() => {
    const element = elementRef.current as HTMLDivElement;

    if (hasSlider) {
      const widthInitialPerc = getSliderWidthCache() ?? sliderWidths.initial;
      const widthPerc = formatSliderWidth(widthInitialPerc);
      element.style.flex = `0 1 ${widthPerc * 100}%`;
      element.dataset.widthPerc = String(widthPerc);
    }

    return () => {
      element.style.flex = '';
      element.dataset.widthPerc = '';
    };
  }, [hasSlider]);

  return (
    <div
      ref={elementRef}
      className={cx('preview', className)}
      css={styles.root}
    >
      {transpilation.isLoading && <Loading full />}

      {!transpilation.isLoading && isCodeUnchanged && (
        <StatusMessage>{newCustomSandboxMessage}</StatusMessage>
      )}

      {!transpilation.isLoading && !isCodeUnchanged && (
        <iframe
          className="preview__iframe"
          ref={iframeRef}
          css={styles.sandbox}
          src={`${sandboxPath}?${sandboxURLSearch}`}
        />
      )}

      {hasSlider && (
        <Slider
          position="left"
          onChange={(offset) => {
            const element = elementRef.current as HTMLDivElement;
            const widthCurrent = element.offsetWidth;
            const widthCurrentPerc = Number(element.dataset.widthPerc);

            // Invert the offset value since it will increase when moving
            // to the left, and viceversa.
            const width = widthCurrent - offset;

            const widthPerc = formatSliderWidth(
              (widthCurrentPerc * width) / widthCurrent
            );

            element.style.flex = `0 1 ${widthPerc * 100}%`;
            element.dataset.widthPerc = String(widthPerc);
            setSliderWidthCache(widthPerc);
          }}
          onReset={() => {
            const element = elementRef.current as HTMLDivElement;
            element.style.flex = '0 1 50%';
            element.dataset.widthPerc = String(sliderWidths.initial);
            setSliderWidthCache(null);
          }}
        />
      )}
    </div>
  );
};

export { Preview };
