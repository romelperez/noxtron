import type { NTSandbox } from '../../types';

const getUserGlobalSandboxes = (): NTSandbox[] => {
  const win = window as any;
  const sandboxes: NTSandbox[] = win.noxtronSandboxes || [];
  return sandboxes;
};

export { getUserGlobalSandboxes };
