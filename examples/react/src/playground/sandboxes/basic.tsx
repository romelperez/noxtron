import React, { ReactElement } from 'react';
import { render } from 'react-dom';

const Sandbox = (): ReactElement => {
  return (
    <div
      className="sandbox"
      style={{
        padding: 20,
        color: '#ee1',
        background: '#222'
      }}
    >
      <h1>Basic Sandbox</h1>
      <p>Simple React component render.</p>
    </div>
  );
};

render(<Sandbox />, document.querySelector('#root'));
