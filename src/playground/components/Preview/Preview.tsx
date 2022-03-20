/** @jsx jsx */
import { jsx, useTheme } from '@emotion/react';
import { ReactElement, useMemo } from 'react';

import { createStyles } from './Preview.styles';

interface PreviewProps {
  className?: string
}

const Preview = (props: PreviewProps): ReactElement => {
  const { className } = props;

  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <div
      className={className}
      css={styles.root}
    >
      <iframe
        css={styles.sandbox}
        src="/play/sandbox/?code=cmVuZGVyKDxoMSBzdHlsZT17eyBtYXJnaW46ICIyMHB4IiwgY29sb3I6ICJjeWFuIiwgYmFja2dyb3VuZDogImJsYWNrIiB9fT5IZWxsbyBOb3h0cm9uITwvaDE+KTs="
      />
    </div>
  );
};

export { Preview };
