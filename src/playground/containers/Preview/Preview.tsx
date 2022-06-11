/** @jsx jsx */
import { jsx } from '@emotion/react';
import { ReactElement, useEffect, useMemo, useRef } from 'react';
import { useStore } from 'effector-react';

import { NT_BREAKPOINTS as breakpoints } from '../../../constants';
import { cx, useMediaQuery } from '../../utils';
import { $setup, $router, $transpilation } from '../../stores';
import { sendReload } from '../../events';
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
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const isMDMediumUp = useMediaQuery(breakpoints.medium.up);
  const elementRef = useRef<HTMLDivElement>(null);

  const setup = useStore($setup);
  const transpilation = useStore($transpilation);
  const router = useStore($router);

  const {
    sandboxPath,
    newCustomSandboxCode = '',
    newCustomSandboxMessage
  } = setup;
  const { optionsBooleans } = router;
  const isCodeUnchanged =
    transpilation.code.trim() === newCustomSandboxCode.trim();
  const hasSlider = optionsBooleans.editor && isMDMediumUp;

  useEffect(() => {
    return sendReload.watch(() => {
      iframeRef.current?.contentWindow?.location.reload();
    });
  }, []);

  useEffect(() => {
    const container = elementRef.current as HTMLDivElement;
    const element = container.parentElement as HTMLDivElement;

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
          src={`${sandboxPath}?${transpilation.sandboxURLParams}`}
        />
      )}

      {hasSlider && (
        <Slider
          position="left"
          onChange={(offset) => {
            const container = elementRef.current as HTMLDivElement;
            const element = container.parentElement as HTMLDivElement;
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
