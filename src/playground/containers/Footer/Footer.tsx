/** @jsx jsx */
import { jsx, useTheme } from '@emotion/react';
import { ReactElement, useMemo } from 'react';

import { NT_BREAKPOINTS as breakpoints } from '../../../constants';
import { cx } from '../../utils/cx';
import { usePlaygroundSettings } from '../../utils/usePlaygroundSettings';
import { useMediaQuery } from '../../utils/useMediaQuery';
import { createStyles } from './Footer.styles';

interface FooterProps {
  className?: string;
}

const Footer = (props: FooterProps): ReactElement => {
  const { className } = props;

  const theme = useTheme();
  const isMDMediumUp = useMediaQuery(breakpoints.medium.up);
  const { links = {} } = usePlaygroundSettings();

  const { small = [], medium = [] } = links;
  const viewportLinks = isMDMediumUp ? medium : small;
  const hasLinks = !!viewportLinks.length;

  const styles = useMemo(
    () => createStyles(theme, hasLinks),
    [theme, hasLinks]
  );

  return (
    <footer className={cx('footer', className)} css={styles.root}>
      {viewportLinks.map((section = [], index) => (
        <div key={index} className="footer__section" css={styles.section}>
          {section.map((item, itemIndex) => (
            <span className="footer__item" key={itemIndex} css={styles.item}>
              {item}
            </span>
          ))}
        </div>
      ))}
    </footer>
  );
};

export { Footer };
