import React, { ReactNode, ReactElement, useMemo } from 'react';
import { ThemeProvider as EmotionThemeProvider, Theme } from '@emotion/react';
import { useStore } from 'effector-react';

import { createTheme } from '../../utils';
import { $setup, $router } from '../../services';

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider = (props: ThemeProviderProps): ReactElement => {
  const { children } = props;

  const setup = useStore($setup);
  const router = useStore($router);

  const theme: Theme = useMemo(() => {
    const colorScheme = router.optionsBooleans.dark ? 'dark' : 'light';
    return createTheme(colorScheme, setup.theme);
  }, [router.optionsBooleans.dark]);

  return <EmotionThemeProvider theme={theme}>{children}</EmotionThemeProvider>;
};

export type { ThemeProviderProps };
export { ThemeProvider };
