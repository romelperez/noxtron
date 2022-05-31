/** @jsx jsx */
import { jsx, useTheme } from '@emotion/react';
import { ReactElement, useEffect, useMemo, useRef, useState } from 'react';

import { createStyles } from './Slider.styles';

interface SliderProps {
  className?: string;
  onChange: (value: number) => void;
}

const Slider = (props: SliderProps): ReactElement => {
  const { className, onChange } = props;

  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current as HTMLDivElement;

    let isActive = false;
    let xInitial = 0;

    const onMove = (event: MouseEvent) => {
      if (isActive) {
        const xOffset = event.pageX - xInitial;
        xInitial = event.pageX;
        onChange(xOffset);
      }
    };

    const onMouseEvent = (event: MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
    };

    const enableSlider = () => {
      isActive = true;
      document.addEventListener('mousemove', onMove);
    };

    const disableSlider = () => {
      isActive = false;
      document.removeEventListener('mousemove', onMove);
    };

    const onMouseDown = (event: MouseEvent) => {
      xInitial = event.pageX;
      onMouseEvent(event);
      enableSlider();
    };

    const onMouseUp = (event: MouseEvent) => {
      onMouseEvent(event);
      disableSlider();
    };

    const onDocumentMouseUp = (event: MouseEvent) => {
      onMouseEvent(event);
      disableSlider();
    };

    element.addEventListener('mousedown', onMouseDown);
    element.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseup', onDocumentMouseUp);

    return () => {
      disableSlider();
      element.addEventListener('mousedown', onMouseDown);
      element.addEventListener('mouseup', onMouseUp);
      document.addEventListener('mouseup', onDocumentMouseUp);
    };
  }, []);

  return <div ref={elementRef} className={className} css={styles.root} />;
};

export { Slider };
