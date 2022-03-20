/** @jsx jsx */
import { jsx, useTheme } from '@emotion/react';
import { ReactElement, useMemo } from 'react';
import { transform } from '@babel/standalone';

import { createStyles } from './Preview.styles';

const codeRaw = `render(
  <h1 style={{ margin: "20px", color: "cyan", background: "black" }}>
    Noxtron Sandbox!
  </h1>
);
`;
const transformation = transform(codeRaw, {
  filename: 'sandbox.tsx',
  presets: ['env', 'react', 'typescript']
});
const codeEncoded = window.encodeURI(window.btoa(transformation.code || ''));;

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
        src={`/play/sandbox/?code=${codeEncoded}`}
      />
    </div>
  );
};

export { Preview };
