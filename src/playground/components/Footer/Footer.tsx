/** @jsx jsx */
import { jsx, useTheme } from '@emotion/react';
import { ReactElement, useMemo } from 'react';

import { createStyles } from './Footer.styles';

interface FooterProps {
  className?: string
}

const Footer = (props: FooterProps): ReactElement => {
  const { className } = props;

  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <footer
      className={className}
      css={styles.root}
    >
      <div css={styles.section}>
        <a href='#' target='_blank'>v1.2.3 22-06-27</a>
        <a href='#' target='_blank'>Website</a>
        <a href='#' target='_blank'>Perf</a>
        <a href='#' target='_blank'>Previous Versions</a>
      </div>
      <div css={styles.section}>
        <a href='#' target='_blank'>GitHub</a>
        <a href='#' target='_blank'>Discord</a>
        <a href='#' target='_blank'>Twitter</a>
      </div>
    </footer>
  );
};

export { Footer };
