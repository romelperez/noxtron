import type { Sandbox } from '../../types';

const getUserGlobalSandboxes = (): Sandbox[] => {
  const win = window as any;
  const sandboxes: Sandbox[] = win.noxtronSandboxes || [];
  return sandboxes;
};

export { getUserGlobalSandboxes };
