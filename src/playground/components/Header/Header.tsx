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
  const { optionsBooleans, setOptions } = useRouterState();

  return (
    <header
      className={className}
      css={styles.root}
    >
      <nav css={styles.options}>
          <Button
            title='Toggle explorer panel'
            color={optionsBooleans.explorer ? 'secondary' : 'primary'}
            onClick={() => setOptions({ explorer: !optionsBooleans.explorer })}
          >
            Explorer
          </Button>
          <Button
            title='Toggle editor panel'
            color={optionsBooleans.editor ? 'secondary' : 'primary'}
            onClick={() => setOptions({ editor: !optionsBooleans.editor })}
          >
            Editor
          </Button>
          <Button
            title='Toggle preview panel'
            color={optionsBooleans.preview ? 'secondary' : 'primary'}
            onClick={() => setOptions({ preview: !optionsBooleans.preview })}
          >
            Preview
          </Button>
          <Button
            title='Toggle theme color scheme'
            onClick={() => setOptions({ dark: !optionsBooleans.dark })}
          >
            Color: {optionsBooleans.dark ? 'Dark' : 'Light'}
          </Button>
        </nav>
        <div css={styles.logo}>
          <a href='/play'>
            <b>Noxtron</b>
          </a>
        </div>
    </header>
  );
};

export { Header };
