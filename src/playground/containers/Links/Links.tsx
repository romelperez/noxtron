/** @jsx jsx */
import { jsx, useTheme } from '@emotion/react';
import { ReactElement, useMemo } from 'react';
import { useStore } from 'effector-react';

import { NT_BREAKPOINTS as breakpoints } from '../../../constants';
import { cx, useMediaQuery } from '../../utils';
import { $setup } from '../../stores';
import { createStyles } from './Links.styles';

interface LinksProps {
  className?: string;
}

const Links = (props: LinksProps): ReactElement => {
  const { className } = props;

  const theme = useTheme();
  const isMDMediumUp = useMediaQuery(breakpoints.medium.up);
  const setup = useStore($setup);

  const { links = {} } = setup;
  const { small = [], medium = [] } = links;
  const viewportLinks = isMDMediumUp ? medium : small;
  const hasLinks = !!viewportLinks.length;

  const styles = useMemo(
    () => createStyles(theme, hasLinks),
    [theme, hasLinks]
  );

  return (
    <nav className={cx('links', className)} css={styles.root}>
      {viewportLinks.map((section = [], index) => (
        <div key={index} className="links__section" css={styles.section}>
          {section.map((item, itemIndex) => (
            <span className="links__item" key={itemIndex} css={styles.item}>
              {item}
            </span>
          ))}
        </div>
      ))}
    </nav>
  );
};

export { Links };
