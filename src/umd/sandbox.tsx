import { setupSandbox } from '../sandbox/index';

const win = window as any;

win.noxtronSandbox = win.noxtronSandbox || {};

win.noxtronSandbox.setupSandbox = setupSandbox;
