/** @jsx jsx */
import { jsx, useTheme } from '@emotion/react';
import { ReactElement, useMemo } from 'react';

import { usePlaygroundSettings } from '../../utils/usePlaygroundSettings';
import { createStyles } from './DesktopFooter.styles';

interface DesktopFooterProps {
  className?: string;
}

const DesktopFooter = (props: DesktopFooterProps): ReactElement => {
  const { className } = props;

  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { links = {} } = usePlaygroundSettings();

  const { desktop = [] } = links;

  return (
    <footer className={className} css={styles.root}>
      {desktop.map((section = [], index) => (
        <div key={index} css={styles.section}>
          {section.map((item, itemIndex) => (
            <span key={itemIndex} css={styles.item}>
              {item}
            </span>
          ))}
        </div>
      ))}
    </footer>
  );
};

export { DesktopFooter };
