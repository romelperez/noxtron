import { memo } from 'react';

import { Editor as Component } from './Editor';

const Editor: typeof Component = memo(Component) as any;

export { Editor };
