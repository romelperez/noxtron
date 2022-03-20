/** @jsx jsx */
import { jsx, useTheme } from '@emotion/react';
import { ReactElement, useMemo } from 'react';

import { Button } from '../Button';
import { createStyles } from './Header.styles';

interface HeaderProps {
  className?: string
}

const Header = (props: HeaderProps): ReactElement => {
  const { className } = props;

  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <header
      className={className}
      css={styles.root}
    >
      <nav css={styles.options}>
          <Button color='secondary'>Explorer</Button>
          <Button color='secondary'>Editor</Button>
          <Button>Preview</Button>
          <Button color='secondary'>Color: Dark</Button>
        </nav>
        <div css={styles.logo}>
          <a href='/play'>
            <b>ARWES PLAYGROUND</b>
          </a>
        </div>
    </header>
  );
};

export { Header };
