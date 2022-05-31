import { memo } from 'react';

import { StatusMessage as Component } from './StatusMessage';

const StatusMessage: typeof Component = memo(Component) as any;

export { StatusMessage };
