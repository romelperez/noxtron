import { memo } from 'react';

import { Explorer as Component } from './Explorer';

const Explorer: typeof Component = memo(Component) as any;

export { Explorer };
