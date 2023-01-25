import React, { ReactElement, useState, useEffect } from 'react';
import { render } from 'react-dom';

const Sandbox = (): ReactElement => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const tid = setTimeout(() => {
      setCount((value) => value + 1);
    }, 100);
    return () => {
      clearTimeout(tid);
    };
  }, [count]);

  return (
    <div
      className="sandbox"
      style={{
        padding: 20,
        color: '#ee1',
        background: '#222'
      }}
    >
      <h1>Intermediate Sandbox</h1>
      <p>Counter: {count}</p>
    </div>
  );
};

render(<Sandbox />, document.querySelector('#root'));
