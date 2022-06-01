import { memo } from 'react';

import { Button as Component } from './Button';

const Button: typeof Component = memo(Component) as any;

export { Button };
