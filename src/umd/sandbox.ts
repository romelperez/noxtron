import { setupSandbox } from '../sandbox/index';

const win = window as any;

win.noxtron = win.noxtron || {};

win.noxtron.setupSandbox = setupSandbox;
