/* eslint-env jest */

import { convertLocationSearchToObject } from './convertLocationSearchToObject';

test('Should convert search string to object', () => {
  const search = '?a=1&b=true';
  expect(convertLocationSearchToObject(search)).toEqual({
    a: '1',
    b: 'true'
  });
});

test('Should convert search string to object and filter repetitions', () => {
  const search = '?a=1&b=true&a=2';
  expect(convertLocationSearchToObject(search)).toEqual({
    a: '2',
    b: 'true'
  });
});
