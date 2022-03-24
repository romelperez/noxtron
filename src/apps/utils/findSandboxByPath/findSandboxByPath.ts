import type { Sandbox } from '../../types';

const findSandboxByPath = (sandboxes: Sandbox[], routerSandbox: string[]): Sandbox | undefined => {
  if (routerSandbox.length) {
    let parentSandboxes: Sandbox[] = sandboxes;

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
