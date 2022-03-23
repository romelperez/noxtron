/** @jsx jsx */
import { jsx, useTheme } from '@emotion/react';
import { HTMLProps, ReactElement, useMemo } from 'react';

import { getUserGlobalConfig } from '../../../utils/getUserGlobalConfig';
import { createStyles } from './Footer.styles';

interface FooterProps {
  className?: string
}

const Footer = (props: FooterProps): ReactElement => {
  const { className } = props;

  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const { links = {} } = getUserGlobalConfig();
  const { desktop = [] } = links;

  // TODO: Implement mobile version.

  return (
    <footer
      className={className}
      css={styles.root}
    >
      {desktop.map((section = [], index) => (
        <div
          key={index}
          css={styles.section}
        >
          {section.map(({ as, ...itemProps }, itemIndex) => {
            if (as === 'a') {
              return (
                <a
                  key={itemIndex}
                  css={styles.item}
                  {...(itemProps as HTMLProps<HTMLAnchorElement>)}
                />
              );
            }
            return (
              <div
                key={itemIndex}
                css={styles.item}
                {...(itemProps as HTMLProps<HTMLDivElement>)}
              />
            );
          })}
        </div>
      ))}
    </footer>
  );
};

export { Footer };
