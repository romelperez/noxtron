import React, { ReactElement, ReactNode } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { usePlaygroundSettings } from '../../utils/usePlaygroundSettings';

interface RouterProviderProps {
  children: ReactNode;
}

const RouterProvider = (props: RouterProviderProps): ReactElement => {
  const { children } = props;

  const { basePath } = usePlaygroundSettings();

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
