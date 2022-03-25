/** @jsx jsx */
import { jsx, useTheme } from '@emotion/react';
import { ReactElement, useMemo } from 'react';
import Icon from '@mdi/react';
import { mdiXml, mdiMenu, mdiChartBubble, mdiInvertColors } from '@mdi/js';

import { useRouterState } from '../../../utils/useRouterState';
import { useUserConfig } from '../../utils/useUserConfig';
import { Button } from '../Button';
import { createStyles } from './Header.styles';

interface HeaderProps {
  className?: string;
}

const Header = (props: HeaderProps): ReactElement => {
  const { className } = props;

  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { optionsBooleans, setOptions } = useRouterState();

  const { title, playgroundPath } = useUserConfig();

  return (
    <header className={className} css={styles.root}>
      <nav css={styles.options}>
        <Button
          css={styles.option}
          title="Toggle explorer panel"
          color={optionsBooleans.explorer ? 'secondary' : 'primary'}
          onClick={() => setOptions({ explorer: !optionsBooleans.explorer })}
        >
          <Icon css={styles.optionIcon} path={mdiMenu} />
          <span css={styles.optionLabel}>Explorer</span>
        </Button>
        <Button
          css={styles.option}
          title="Toggle editor panel"
          color={optionsBooleans.editor ? 'secondary' : 'primary'}
          onClick={() => setOptions({ editor: !optionsBooleans.editor })}
        >
          <Icon css={styles.optionIcon} path={mdiXml} />
          <span css={styles.optionLabel}>Editor</span>
        </Button>
        <Button
          css={styles.option}
          title="Toggle preview panel"
          color={optionsBooleans.preview ? 'secondary' : 'primary'}
          onClick={() => setOptions({ preview: !optionsBooleans.preview })}
        >
          <Icon css={styles.optionIcon} path={mdiChartBubble} />
          <span css={styles.optionLabel}>Preview</span>
        </Button>
        <Button
          css={styles.option}
          title="Toggle theme color scheme"
          onClick={() => setOptions({ dark: !optionsBooleans.dark })}
        >
          <Icon css={styles.optionIcon} path={mdiInvertColors} />
          <span css={styles.optionLabel}>
            Color: {optionsBooleans.dark ? 'Dark' : 'Light'}
          </span>
        </Button>
      </nav>
      <div css={styles.logo}>
        <a href={playgroundPath}>
          <span css={styles.logoMobile}>{title?.mobile || 'Noxtron'}</span>
          <span css={styles.logoDesktop}>{title?.desktop || 'Noxtron'}</span>
        </a>
      </div>
    </header>
  );
};

export { Header };
