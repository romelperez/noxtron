import { memo } from 'react';

import { SandboxList as Component } from './SandboxList';

const SandboxList: typeof Component = memo(Component) as any;

export { SandboxList };
