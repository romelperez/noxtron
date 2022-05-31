import { memo } from 'react';

import { Loading as Component } from './Loading';

const Loading: typeof Component = memo(Component) as any;

export { Loading };
