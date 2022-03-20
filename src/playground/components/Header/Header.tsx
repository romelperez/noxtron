/** @jsx jsx */
import { jsx, useTheme } from '@emotion/react';
import { ReactElement, useMemo } from 'react';

import { useRouterState } from '@src/utils/useRouterState';
import { Button } from '../Button';
import { createStyles } from './Header.styles';

interface HeaderProps {
  className?: string
}

const Header = (props: HeaderProps): ReactElement => {
  const { className } = props;

  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { optionsBooleans, setOptionValue } = useRouterState();

  return (
    <header
      className={className}
      css={styles.root}
    >
      <nav css={styles.options}>
          <Button
            color={optionsBooleans.explorer ? 'secondary' : 'primary'}
            onClick={() => setOptionValue('explorer', String(!optionsBooleans.explorer))}
          >
            Explorer
          </Button>
          <Button
            color={optionsBooleans.editor ? 'secondary' : 'primary'}
            onClick={() => setOptionValue('editor', String(!optionsBooleans.editor))}
          >
            Editor
          </Button>
          <Button
            color={optionsBooleans.preview ? 'secondary' : 'primary'}
            onClick={() => setOptionValue('preview', String(!optionsBooleans.preview))}
          >
            Preview
          </Button>
          <Button
            onClick={() => setOptionValue('dark', String(!optionsBooleans.dark))}
          >
            Color: {optionsBooleans.dark ? 'Dark' : 'Light'}
          </Button>
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
