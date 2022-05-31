import { memo } from 'react';

import { Preview as Component } from './Preview';

const Preview: typeof Component = memo(Component) as any;

export { Preview };
