import React, { ReactElement, useMemo } from 'react';
import { ThemeProvider, Theme, Global } from '@emotion/react';

import { createTheme } from '@src/utils/createTheme';
import { App } from '../App';
import { createStyles } from './Scaffold.styles';

const Scaffold = (): ReactElement => {
  const theme: Theme = useMemo(() => createTheme('dark'), []);
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <ThemeProvider theme={theme}>
      <Global styles={styles.global} />
      <App />
    </ThemeProvider>
  );
};

export { Scaffold };
