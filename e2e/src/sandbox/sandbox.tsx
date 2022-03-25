import random from 'lodash/random';
import * as emotionReact from '@emotion/react';
import * as motion from 'motion';

import { setupSandbox } from '../../../build/cjs/apps/sandbox';

setupSandbox({
  dependencies: [
    { name: 'lodash/random', pkg: random },
    { name: '@emotion/react', pkg: emotionReact },
    { name: 'motion', pkg: motion }
  ]
});
