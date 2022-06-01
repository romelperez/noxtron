/** @jsx jsx */
import { jsx, useTheme } from '@emotion/react';
import { ReactElement, useEffect, useMemo, useRef } from 'react';

import { createStyles } from './Slider.styles';

interface SliderProps {
  className?: string;
  position?: 'left' | 'right';
  onChange: (value: number) => void;
  onReset?: () => void;
}

const Slider = (props: SliderProps): ReactElement => {
  const { className, position = 'left', onChange, onReset } = props;

  const theme = useTheme();
  const styles = useMemo(
    () => createStyles(theme, position),
    [theme, position]
  );
  const containerElementRef = useRef<HTMLDivElement>(null);
  const barElementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const containerElement = containerElementRef.current as HTMLDivElement;
    const barElement = barElementRef.current as HTMLDivElement;

    let isActive = false;
    let xInitial = 0;

    const onMove = (event: MouseEvent) => {
      if (isActive) {
        // Send how many pixels the mouse moved in the X axis since the last movement.
        const xOffset = event.pageX - xInitial;
        xInitial = event.pageX;
        onChange(xOffset);
      }
    };

    const enableSlider = () => {
      isActive = true;
      document.addEventListener('mousemove', onMove);
    };

    const disableSlider = () => {
      isActive = false;
      document.removeEventListener('mousemove', onMove);
    };

    const onStart = (event: MouseEvent) => {
      xInitial = event.pageX;

      enableSlider();

      Object.assign(containerElement.style, styles.rootIsActive);
      Object.assign(barElement.style, { opacity: 1 });
    };

    const onStop = () => {
      disableSlider();

      Object.assign(containerElement.style, styles.rootIsInactive);
      Object.assign(barElement.style, { opacity: 0 });
    };

    containerElement.addEventListener('mousedown', onStart);
    containerElement.addEventListener('mouseup', onStop);
    document.addEventListener('mouseup', onStop);

    return () => {
      disableSlider();
      containerElement.removeEventListener('mousedown', onStart);
      containerElement.removeEventListener('mouseup', onStop);
      document.removeEventListener('mouseup', onStop);
    };
  }, []);

  return (
    <div
      ref={containerElementRef}
      className={className}
      css={[styles.root, styles.rootIsInactive]}
      onDoubleClick={() => onReset?.()}
    >
      <div ref={barElementRef} css={styles.bar} />
    </div>
  );
};

export { Slider };