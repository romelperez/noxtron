import random from 'lodash/random';
import * as motion from 'motion';

import { setupSandbox } from '../../../build/cjs/apps/sandbox';

setupSandbox({
  dependencies: [
    { name: 'lodash/random', pkg: random },
    { name: 'motion', pkg: motion }
  ]
});