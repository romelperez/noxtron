/** @jsx jsx */
import { jsx } from '@emotion/react';
import { ReactElement } from 'react';
import MDIIcon from '@mdi/react';

import { cx } from '../../utils/cx';

interface IconProps {
  className?: string;
  path: string;
}

const Icon = (props: IconProps): ReactElement => {
  const { className, path } = props;

  return (
    <MDIIcon
      className={cx('icon', className)}
      css={{ width: '1.2em', height: '1.2em' }}
      path={path}
    />
  );
};

export type { IconProps };
export { Icon };
