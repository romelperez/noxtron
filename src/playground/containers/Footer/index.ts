import { memo } from 'react';

import { Footer as Component } from './Footer';

const Footer: typeof Component = memo(Component) as any;

export { Footer };
