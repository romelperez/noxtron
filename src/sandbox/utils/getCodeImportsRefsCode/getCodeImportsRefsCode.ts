import type { NTSandboxImportRef } from '../../../types';

const getCodeImportsRefsCode = (importsRefs: NTSandboxImportRef[]): string => {
  return importsRefs
    .map(
      ({ values, dependencySlug }) => `const ${values} = ${dependencySlug};\n`
    )
    .join('');
};

export { getCodeImportsRefsCode };
