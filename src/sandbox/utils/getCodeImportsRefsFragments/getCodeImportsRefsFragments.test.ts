/* eslint-env jest */

import type { NTSandboxDependency, NTSandboxImportRef } from '../../../types';
import { getCodeImportsRefsFragments } from './getCodeImportsRefsFragments';

test('Should throw if import references a non existent dependency', () => {
  const dependencies: NTSandboxDependency[] = [
    { name: 'a', slug: 'a', pkg: null },
    { name: 'b', slug: 'b', pkg: null }
  ];
  const importsLines = [`import b from 'b';`, `import x from 'x';`];
  expect(() => {
    getCodeImportsRefsFragments(dependencies, importsLines);
  }).toThrow(`[Noxtron] Sandbox dependency "x" is not available.`);
});

test('Should filter import type', () => {
  const dependencies: NTSandboxDependency[] = [
    { name: 'a', slug: 'a', pkg: null },
    { name: 'b', slug: 'b', pkg: null }
  ];
  const importsLines = [
    `import type a from 'a';`,
    `import type { x } from 'b';`
  ];
  const received = getCodeImportsRefsFragments(dependencies, importsLines);
  const expected: NTSandboxImportRef[] = [];
  expect(received).toEqual(expected);
});

test('Should get unique import value', () => {
  const dependencies: NTSandboxDependency[] = [
    { name: 'a', slug: 'a', pkg: null },
    { name: 'b', slug: 'b', pkg: null }
  ];
  const importsLines = [`import a from 'a';`, `import b from 'b';`];
  const received = getCodeImportsRefsFragments(dependencies, importsLines);
  const expected: NTSandboxImportRef[] = [
    { values: 'a', dependencyName: 'a', dependencySlug: 'a' },
    { values: 'b', dependencyName: 'b', dependencySlug: 'b' }
  ];
  expect(received).toEqual(expected);
});

test('Should get simple spread import value', () => {
  const dependencies: NTSandboxDependency[] = [
    { name: '@b/x', slug: '_b_x', pkg: null },
    { name: 'c/p', slug: 'c_p', pkg: null }
  ];
  const importsLines = [
    `import { x } from '@b/x';`,
    `import { p, P } from 'c/p';`
  ];
  const received = getCodeImportsRefsFragments(dependencies, importsLines);
  const expected: NTSandboxImportRef[] = [
    { values: '{ x }', dependencyName: '@b/x', dependencySlug: '_b_x' },
    { values: '{ p, P }', dependencyName: 'c/p', dependencySlug: 'c_p' }
  ];
  expect(received).toEqual(expected);
});

test('Should get rename spread import value', () => {
  const dependencies: NTSandboxDependency[] = [
    { name: 'a', slug: 'a', pkg: null },
    { name: 'b', slug: 'b', pkg: null }
  ];
  const importsLines = [
    `import { a, p as b } from 'b';`,
    `import { p as b, a } from 'b';`
  ];
  const received = getCodeImportsRefsFragments(dependencies, importsLines);
  const expected: NTSandboxImportRef[] = [
    { values: '{ a, p: b }', dependencyName: 'b', dependencySlug: 'b' },
    { values: '{ p: b, a }', dependencyName: 'b', dependencySlug: 'b' }
  ];
  expect(received).toEqual(expected);
});

// TODO: Asterisk import should be processed with "tslib".
test('Should get asterisk import value', () => {
  const dependencies: NTSandboxDependency[] = [
    { name: 'a', slug: 'a', pkg: null },
    { name: 'b', slug: 'b', pkg: null }
  ];
  const importsLines = [`import * as a from 'a';`, `import * as b from 'b';`];
  const received = getCodeImportsRefsFragments(dependencies, importsLines);
  const expected: NTSandboxImportRef[] = [
    { values: 'a', dependencyName: 'a', dependencySlug: 'a' },
    { values: 'b', dependencyName: 'b', dependencySlug: 'b' }
  ];
  expect(received).toEqual(expected);
});
