/* eslint-env jest */

import type { NTSandboxImportRef } from '../../../types';
import { getCodeImportsRefsCode } from './getCodeImportsRefsCode';

test('Should map code imports into declarations', () => {
  const importsRefs: NTSandboxImportRef[] = [
    { values: 'a', dependencyName: 'x', dependencySlug: 'x' },
    { values: '{ b, c }', dependencyName: 'y', dependencySlug: 'y' }
  ];
  const received = getCodeImportsRefsCode(importsRefs);
  const expected = `const a = x;
const { b, c } = y;
`;
  expect(received).toEqual(expected);
});
