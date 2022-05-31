import { memo } from 'react';

import { Header as Component } from './Header';

const Header: typeof Component = memo(Component) as any;

export { Header };
