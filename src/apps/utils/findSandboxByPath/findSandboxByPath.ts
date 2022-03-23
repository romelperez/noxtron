import type { StoreSandbox } from '@src/apps/types';

const findSandboxByPath = (sandboxes: StoreSandbox[], routerSandbox: string[]): StoreSandbox | undefined => {
  if (routerSandbox.length) {
    let parentSandboxes: StoreSandbox[] = sandboxes;

    for (let index = 0; index < routerSandbox.length; index++) {
      const namePart = routerSandbox[index];

      for (const sandbox of parentSandboxes) {
        if (sandbox.name === namePart) {
          if (index === routerSandbox.length - 1) {
            return sandbox;
          }
          parentSandboxes = sandbox.children || [];
        }
      }
    }
  }
};

export { findSandboxByPath };
