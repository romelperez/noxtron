import { setupPlayground } from '../playground/containers/setupPlayground';

const win = window as any;

win.noxtron = win.noxtron || {};

win.noxtron.setupPlayground = setupPlayground;
