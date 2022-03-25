import random from 'lodash/random';
import * as motion from 'motion';

import { setupSandbox } from '../../../build/cjs/apps/sandbox';

setupSandbox({
  dependencies: [
    { name: 'lodash/random', slug: 'lodashRandom', pkg: random },
    { name: 'motion', slug: 'motion', pkg: motion }
  ]
});
