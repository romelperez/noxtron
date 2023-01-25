/** @jsx jsx */
import { jsx } from '@emotion/react';
import { useRef, useEffect, ReactElement } from 'react';
import { render } from 'react-dom';
import random from 'lodash/random';
import * as empanada from 'empanada';
import { animate } from 'motion';

const Sandbox = (): ReactElement => {
  const elementRef = useRef<HTMLDivElement>(null);
  const words = empanada.createRandomWords(random(5, 30));

  useEffect(() => {
    animate(
      elementRef.current!,
      { x: [0, 50] },
      { repeat: Infinity, direction: 'alternate', duration: 1 }
    );
  }, []);

  return (
    <div
      ref={elementRef}
      className="sandbox"
      css={{
        padding: 20,
        width: '60%',
        color: '#ee1',
        background: '#222'
      }}
    >
      <h1>Complex Sandbox</h1>
      <p css={{ fontSize: '24px' }}>Random Words: {words}</p>
    </div>
  );
};

render(<Sandbox />, document.querySelector('#root'));
