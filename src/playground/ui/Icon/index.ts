import { memo } from 'react';

import { Icon as Component } from './Icon';

const Icon: typeof Component = memo(Component) as any;

export { Icon };
