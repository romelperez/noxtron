/* eslint-env jest */

import { convertLocationSearchToString } from './convertLocationSearchToString';

test('Should convert search object to URL string', () => {
  const search = {
    a: 1,
    b: true,
    c: 'yes'
  };
  expect(convertLocationSearchToString(search)).toBe('a=1&b=true&c=yes');
});

test('Should convert search object to URL string without undefineds', () => {
  const search = {
    a: 0,
    b: false,
    c: 'no',
    d: undefined
  };
  expect(convertLocationSearchToString(search)).toBe('a=0&b=false&c=no');
});
