/** @jsx jsx */
import { jsx, useTheme } from '@emotion/react';
import { ReactElement, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@mdi/react';

import { NT_ICONS, NT_BREAKPOINTS as breakpoints } from '../../../constants';
import { cx } from '../../utils/cx';
import { useMediaQuery } from '../../utils/useMediaQuery';
import { useRouterState } from '../../utils/useRouterState';
import { usePlaygroundSettings } from '../../utils/usePlaygroundSettings';
import { useStore } from '../../utils/useStore';
import { Button } from '../../ui/Button';
import { createStyles } from './Header.styles';

interface HeaderProps {
  className?: string;
}

const { mdiXml, mdiMenu, mdiChartBubble, mdiInvertColors } = NT_ICONS;

const Header = (props: HeaderProps): ReactElement => {
  const { className } = props;

  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { header, title } = usePlaygroundSettings();
  const { optionsBooleans, setOptions } = useRouterState();
  const isMDMediumUp = useMediaQuery(breakpoints.medium.up);
  const isLoading = useStore((state) => state.isLoading);
  const error = useStore((state) => state.error);

  const isControlsDisabled = isLoading || !!error;

  return (
    <header className={cx('header', className)} css={styles.root}>
      <nav className="header__options" css={styles.options}>
        <Button
          css={styles.option}
          title="Toggle explorer panel"
          color={optionsBooleans.explorer ? 'secondary' : 'primary'}
          disabled={isControlsDisabled}
          onClick={() => setOptions({ explorer: !optionsBooleans.explorer })}
        >
          <Icon path={mdiMenu} />
          <span css={styles.optionLabel}>Explorer</span>
        </Button>

        <Button
          css={styles.option}
          title="Toggle editor panel"
          color={optionsBooleans.editor ? 'secondary' : 'primary'}
          disabled={isControlsDisabled}
          onClick={() => setOptions({ editor: !optionsBooleans.editor })}
        >
          <Icon path={mdiXml} />
          <span css={styles.optionLabel}>Editor</span>
        </Button>

        <Button
          css={styles.option}
          title="Toggle preview panel"
          color={optionsBooleans.preview ? 'secondary' : 'primary'}
          disabled={isControlsDisabled}
          onClick={() => setOptions({ preview: !optionsBooleans.preview })}
        >
          <Icon path={mdiChartBubble} />
          <span css={styles.optionLabel}>Preview</span>
        </Button>

        <Button
          css={styles.option}
          title="Toggle theme color scheme"
          onClick={() => setOptions({ dark: !optionsBooleans.dark })}
        >
          <Icon path={mdiInvertColors} />
          <span css={styles.optionLabel}>
            {optionsBooleans.dark ? 'Dark' : 'Light'}
          </span>
        </Button>
      </nav>
      <div className="header__content" css={styles.content}>
        <div className="header__custom" css={styles.custom}>
          {(isMDMediumUp && header?.medium) || header?.small}
        </div>
        <h1 className="header__logo" css={styles.logo}>
          <Link to="/">{(isMDMediumUp && title?.medium) || title?.small}</Link>
        </h1>
      </div>
    </header>
  );
};

export { Header };
