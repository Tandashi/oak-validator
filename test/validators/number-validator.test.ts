import { assertEquals } from '$/testing/asserts.ts';
import validateNumber from '../../src/validators/number-validator.ts';

Deno.test('Undefined is invalid', () => {
  assertEquals(
    validateNumber(undefined, {
      type: 'number',
    }),
    false
  );
});

Deno.test('String is invalid', () => {
  assertEquals(
    validateNumber('', {
      type: 'number',
    }),
    false
  );
});

Deno.test('Any number is valid if no exceptions are specified', () => {
  assertEquals(
    validateNumber(8, {
      type: 'number',
    }),
    true
  );
});

Deno.test('Number invalid when smaller then min', () => {
  assertEquals(
    validateNumber(8, {
      type: 'number',
      min: 9,
    }),
    false
  );
});

Deno.test('Number valid when equal to min', () => {
  assertEquals(
    validateNumber(9, {
      type: 'number',
      min: 9,
    }),
    true
  );
});

Deno.test('Number valid when bigger then min', () => {
  assertEquals(
    validateNumber(10, {
      type: 'number',
      min: 9,
    }),
    true
  );
});

Deno.test('Number invalid when bigger then max', () => {
  assertEquals(
    validateNumber(10, {
      type: 'number',
      max: 9,
    }),
    false
  );
});

Deno.test('Number valid when equal to max', () => {
  assertEquals(
    validateNumber(9, {
      type: 'number',
      max: 9,
    }),
    true
  );
});

Deno.test('Number valid when smaller then max', () => {
  assertEquals(
    validateNumber(8, {
      type: 'number',
      max: 9,
    }),
    true
  );
});

Deno.test('Number valid when it matches the specified value', () => {
  assertEquals(
    validateNumber(8, {
      type: 'number',
      value: 8,
    }),
    true
  );
});

Deno.test('Number invalid when its doesnt match the specified value', () => {
  assertEquals(
    validateNumber(7, {
      type: 'number',
      value: 8,
    }),
    false
  );
});

Deno.test('Number is valid when customRules are valid', () => {
  assertEquals(
    validateNumber(7, {
      type: 'number',
      customRules: [(value) => value % 2 === 1],
    }),
    true
  );
});

Deno.test('Number is invalid when customRules are invalid', () => {
  assertEquals(
    validateNumber(7, {
      type: 'number',
      customRules: [(value) => value % 2 === 0],
    }),
    false
  );
});

Deno.test('Number is invalid when onne customRule is invalid', () => {
  assertEquals(
    validateNumber(7, {
      type: 'number',
      customRules: [(value) => value % 2 === 1, (value) => value === 8],
    }),
    false
  );
});
