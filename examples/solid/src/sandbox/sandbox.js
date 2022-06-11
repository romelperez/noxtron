import * as solidjs from 'solid-js';
import * as solidjsWeb from 'solid-js/web';
import h from 'solid-js/h';

window.noxtron.setupSandbox(() => ({
  dependencies: [
    { name: 'solid-js/h', pkg: h },
    { name: 'solid-js/web', pkg: solidjsWeb },
    { name: 'solid-js', pkg: solidjs }
  ]
}));
