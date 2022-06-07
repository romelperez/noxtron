import React, { ReactNode, ReactElement, useMemo } from 'react';
import { ThemeProvider as EmotionThemeProvider, Theme } from '@emotion/react';

import {
  createTheme,
  useRouterState,
  usePlaygroundSettings
} from '../../utils';

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider = (props: ThemeProviderProps): ReactElement => {
  const { children } = props;

  const routerState = useRouterState();
  const settings = usePlaygroundSettings();

  const theme: Theme = useMemo(() => {
    const colorScheme = routerState.optionsBooleans.dark ? 'dark' : 'light';
    return createTheme(colorScheme, settings.theme);
  }, [routerState.optionsBooleans.dark, settings.theme]);

  return <EmotionThemeProvider theme={theme}>{children}</EmotionThemeProvider>;
};

export type { ThemeProviderProps };
export { ThemeProvider };
