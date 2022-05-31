import { memo } from 'react';

import { Toolbar as Component } from './Toolbar';

const Toolbar: typeof Component = memo(Component) as any;

export { Toolbar };
