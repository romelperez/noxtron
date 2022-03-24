/* eslint-env jest */

import { cx } from './cx';

test('Should return empty string on no parameters', () => {
  expect(cx()).toBe('');
});

test('Should join multiple classes', () => {
  expect(cx('a', 'b', 'c')).toBe('a b c');
});

test('Should filter undefined values', () => {
  expect(cx('a', undefined, 'b', null, 'c', false)).toBe('a b c');
});
