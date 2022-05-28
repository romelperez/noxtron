import React, { ReactElement, ReactNode } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { usePlaygroundSetup } from '../../utils/usePlaygroundSetup';

interface RouterProviderProps {
  children: ReactNode;
}

const RouterProvider = (props: RouterProviderProps): ReactElement => {
  const { children } = props;

  const { basePath } = usePlaygroundSetup();

  return (
    <BrowserRouter basename={basePath}>
      <Routes>
        <Route path="*" element={children} />
      </Routes>
    </BrowserRouter>
  );
};

export type { RouterProviderProps };
export { RouterProvider };
