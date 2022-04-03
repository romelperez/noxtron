/* eslint-env jest */

import { convertCodeImportsToRefs } from './convertCodeImportsToRefs';

test('Should return empty code and imports if empty code is provided', () => {
  const code = '';
  const expected = {
    importsLines: [],
    code: ''
  };
  const received = convertCodeImportsToRefs(code);
  expect(received).toEqual(expected);
});

test('Should return code and no imports if code does not have imports', () => {
  const code = `console.log('Hello!');`;
  const expected = {
    importsLines: [],
    code: `console.log('Hello!');`
  };
  const received = convertCodeImportsToRefs(code);
  expect(received).toEqual(expected);
});

test('Should return code and imports sepatared', () => {
  const code = `
import a from 'a';
import x from '@b/x';
console.log(a);
console.log(x);
  `;
  const expected = {
    importsLines: [`import a from 'a';`, `import x from '@b/x';`],
    code: `console.log(a);
console.log(x);`
  };
  const received = convertCodeImportsToRefs(code);
  expect(received).toEqual(expected);
});
