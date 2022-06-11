import { memo } from 'react';

import { MainLayout as Component } from './MainLayout';

const MainLayout: typeof Component = memo(Component) as any;

export { MainLayout };
