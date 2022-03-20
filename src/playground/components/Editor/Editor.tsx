/** @jsx jsx */
import { jsx, useTheme } from '@emotion/react';
import { ReactElement, useMemo } from 'react';

import { createStyles } from './Editor.styles';

interface EditorProps {
  className?: string
}

const Editor = (props: EditorProps): ReactElement => {
  const { className } = props;

  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <div
      className={className}
      css={styles.root}
    >
      EDITOR
    </div>
  );
};

export { Editor };
