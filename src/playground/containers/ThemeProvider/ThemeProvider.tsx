import React, { ReactNode, ReactElement, useMemo } from 'react';
import { ThemeProvider as EmotionThemeProvider, Theme } from '@emotion/react';

import { createTheme } from '../../utils/createTheme';
import { useRouterState } from '../../utils/useRouterState';
import { usePlaygroundSetup } from '../../utils/usePlaygroundSetup';

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider = (props: ThemeProviderProps): ReactElement => {
  const { children } = props;

  const routerState = useRouterState();
  const setup = usePlaygroundSetup();

  const theme: Theme = useMemo(() => {
    const colorScheme = routerState.optionsBooleans.dark ? 'dark' : 'light';
    return createTheme(colorScheme, setup.theme);
  }, [routerState.optionsBooleans.dark, setup.theme]);

  return <EmotionThemeProvider theme={theme}>{children}</EmotionThemeProvider>;
};

export type { ThemeProviderProps };
export { ThemeProvider };
