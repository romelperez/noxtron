```tsx
import React, { useRef, useEffect } from 'react';
import random from 'lodash/random';
import * as empanada from 'empanada';
import { animate } from 'motion';

const App = (): ReactElement => {
  const elementRef = useRef();
  const words = empanada.createRandomWords(random(5, 20));

  useEffect(() => {
    animate(
      elementRef.current,
      { x: [0, 100] },
      { repeat: Infinity, direction: 'alternate', duration: 1 }
    );
  }, []);

  return (
    <h1
      ref={elementRef}
      style={{
        padding: '20px',
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

render(<App />);
```
