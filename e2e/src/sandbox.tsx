import * as motion from 'motion';

import { setupSandbox } from '../../build/cjs/apps/sandbox';

setupSandbox({
  dependencies: [{ name: 'motion', pkg: motion }]
});
