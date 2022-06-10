import { memo } from 'react';

import { Links as Component } from './Links';

const Links: typeof Component = memo(Component) as any;

export { Links };
