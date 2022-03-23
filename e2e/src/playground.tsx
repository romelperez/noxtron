import React from 'react';
import { render } from 'react-dom';

import { Playground } from '../../build/cjs/apps';

render(<Playground />, document.querySelector('#root'));
