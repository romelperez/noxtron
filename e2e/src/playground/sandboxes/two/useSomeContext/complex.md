```tsx
import React from 'react';
import { render } from 'react-dom';

const App = (): ReactElement => {
  return (
    <h1 style={{ padding: 20, color: '#ff0', background: '#000' }}>
      two useSomeContext complex
    </h1>
  );
};

render(<App />, document.querySelector('#root'));
```
