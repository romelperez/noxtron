import { createEvent } from 'effector';

import {
  NTRouterOptionsUpdate,
  NTSandbox,
  NTStoreRouter,
  NTStoreTranspilation,
  NTAppPlaygroundSettings
} from '../types';

export const sendSetupState =
  createEvent<NTAppPlaygroundSettings>('sendSetupState');

export const sendLoad = createEvent('sendLoad');

export const sendRouterState = createEvent<NTStoreRouter>('sendRouterState');

export const sendRoute = createEvent<NTRouterOptionsUpdate>('sendRoute');

export const sendTranspile =
  createEvent<Partial<NTStoreTranspilation>>('sendTranspile');

export const sendSandbox = createEvent<NTSandbox | null>('sendSandbox');

export const sendReload = createEvent('sendReload');

export const sendReset = createEvent('sendReset');

export const sendCustomize = createEvent('sendCustomize');

export const sendIsolate = createEvent('sendIsolate');

export const sendCopy = createEvent('sendCopy');
