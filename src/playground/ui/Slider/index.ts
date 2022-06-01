import { memo } from 'react';

import { Slider as Component } from './Slider';

const Slider: typeof Component = memo(Component) as any;

export { Slider };
