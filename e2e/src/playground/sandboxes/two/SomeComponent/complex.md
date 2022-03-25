```tsx
/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { useRef, useEffect } from 'react';
import { render } from 'react-dom';
import random from 'lodash/random';
import * as empanada from 'empanada';
import { animate } from 'motion';

const App = (): ReactElement => {
  const elementRef = useRef();
  const words = empanada.createRandomWords(random(5, 20));

  useEffect(() => {
    animate(
      elementRef.current,
      { x: [0, 50] },
      { repeat: Infinity, direction: 'alternate', duration: 1 }
    );
  }, []);

  return (
    <h1
      ref={elementRef}
      css={{
        padding: 20,
        width: '60%',
        fontSize: '24px',
        color: 'yellow',
        backgroundColor: 'black'
      }}
    >
      {words}
    </h1>
  );
};

render(<App />, document.querySelector('#root'));
```
