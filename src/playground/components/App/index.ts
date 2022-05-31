import { memo } from 'react';

import { App as Component } from './App';

const App: typeof Component = memo(Component) as any;

export { App };
