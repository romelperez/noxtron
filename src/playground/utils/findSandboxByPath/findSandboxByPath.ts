import type { NTSandbox } from '../../../types';

const findSandboxByPath = (
  sandboxes: NTSandbox[],
  routerSandbox: string[]
): NTSandbox | undefined => {
  if (routerSandbox.length) {
    let parentSandboxes: NTSandbox[] = sandboxes;

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
