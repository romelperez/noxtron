import React from 'react';
import ReactDOM from 'react-dom';
import * as empanada from 'empanada';
import random from 'lodash/random';
import * as emotionReact from '@emotion/react';
import * as motion from 'motion';

import { setupSandbox } from '../../../../build/cjs/apps/sandbox';

setupSandbox({
  dependencies: [
    { name: 'react', pkg: React },
    { name: 'react-dom', pkg: ReactDOM },
    { name: 'empanada', pkg: empanada },
    { name: 'lodash/random', pkg: random },
    { name: '@emotion/react', pkg: emotionReact },
    { name: 'motion', pkg: motion }
  ]
});
