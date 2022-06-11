import React, { ReactElement } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useStore } from 'effector-react';

import { RouterState } from '../RouterState';
import { ThemeProvider } from '../ThemeProvider';
import { App } from '../App';
import { $setup } from '../../stores';

const Playground = (): ReactElement => {
  const setup = useStore($setup);

  return (
    <BrowserRouter basename={setup.basePath}>
      <Routes>
        <Route
          path="*"
          element={
            <ThemeProvider>
              <RouterState />
              <App />
            </ThemeProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export { Playground };
