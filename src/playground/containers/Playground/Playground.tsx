import React, { ReactElement } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useStore } from 'effector-react';

import { RouterState } from '../RouterState';
import { ThemeProvider } from '../ThemeProvider';
import { App } from '../App';
import { $setup } from '../../stores';

const Playground = (): ReactElement => {
  const setup = useStore($setup);

  // If the basename ends with "/" but the server strips it, then the application
  // will not recognize the URL as part of the application.
  const basename =
    setup.basePath === '/' ? '/' : setup.basePath.replace(/\/$/, '');

  return (
    <BrowserRouter basename={basename}>
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
