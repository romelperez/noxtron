import type { NTSandboxDependency, NTSandboxImportRef } from '../../../types';

const getCodeImportsRefsFragments = (
  dependencies: NTSandboxDependency[],
  importsLines: string[]
): NTSandboxImportRef[] => {
  return importsLines
    .map((line) => {
      // Types not needed.
      if (line.trim().startsWith('import type ')) {
        return [];
      }

      const fragments = line.trim().split(/(import|from)/);
      const [, , namesProvided, , fromProvided] = fragments;
      const names = namesProvided.trim().replace(/\s{1,}/g, ' ');
      const from = fromProvided.trim().replace(/["';]/g, '');

      const dependency = dependencies.find((dep) => dep.name === from);

      if (!dependency) {
        throw new Error(`[Noxtron] Sandbox dependency "${from}" is not available.
It needs to be setup in the sandbox application.`);
      }

      const newNamesList: string[] = [];

      // Format: "{ a, b, c }"
      if (/^\{.+\}$/.test(names)) {
        newNamesList.push(names.replace(' as ', ': '));
      }
      // Format: "a, { b, c }" and "a, { b as x, c }"
      else if (/.+\,\s*\{.+\}/.test(names)) {
        const [nameMainRaw] = names.match(/.+\,\s*\{/) || [];
        const [nameDes] = names.match(/\{.+\}/) || [];
        const nameMain = nameMainRaw.replace(/\,\s*\{/, '').trim();

        // Remove if it has already been declared by the function.
        if (nameMain !== dependency.slug) {
          newNamesList.push(nameMain);
        }

        newNamesList.push(nameDes);
      }
      // Format: "* as a"
      else if (/^\* as /.test(names)) {
        newNamesList.push(names.replace('* as ', ''));
      }
      // Format: "a" and errors
      else {
        newNamesList.push(names);
      }

      return newNamesList.map((newNamesItem) => {
        return {
          values: newNamesItem,
          dependencyName: dependency.name,
          dependencySlug: dependency.slug
        } as NTSandboxImportRef;
      });
    })
    .flat();
};

export { getCodeImportsRefsFragments };
