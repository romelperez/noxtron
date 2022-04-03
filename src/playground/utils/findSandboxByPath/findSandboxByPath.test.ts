/* eslint-env jest */

import type { NTSandbox } from '../../../types';
import { findSandboxByPath } from './findSandboxByPath';

test('Should return undefined if provided empty sandboxes', () => {
  const sandboxes: NTSandbox[] = [];
  const path: string[] = ['a', 'b'];
  expect(findSandboxByPath(sandboxes, path)).toBeUndefined();
});

test('Should return undefined if provided empty path', () => {
  const sandboxes: NTSandbox[] = [{ name: 'a' }, { name: 'b' }];
  const path: string[] = [];
  expect(findSandboxByPath(sandboxes, path)).toBeUndefined();
});

test('Should return sandbox first level if matches', () => {
  const a: NTSandbox = { name: 'a' };
  const b: NTSandbox = { name: 'b' };
  const c: NTSandbox = { name: 'c' };
  const sandboxes: NTSandbox[] = [a, b, c];
  const path: string[] = ['b'];
  expect(findSandboxByPath(sandboxes, path)).toBe(b);
});

test('Should return deep sandbox if matches', () => {
  const x: NTSandbox = { name: 'x' };
  const y: NTSandbox = { name: 'y' };
  const z: NTSandbox = { name: 'z' };
  const a: NTSandbox = { name: 'a', children: [x, y] };
  const b: NTSandbox = { name: 'b', children: [z] };
  const sandboxes: NTSandbox[] = [a, b];
  const path: string[] = ['a', 'y'];
  expect(findSandboxByPath(sandboxes, path)).toBe(y);
});
