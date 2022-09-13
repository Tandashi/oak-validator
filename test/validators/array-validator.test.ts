import { assertEquals } from '$/testing/asserts.ts';
import validateArray from '../../src/validators/array-validator.ts';

Deno.test('Undefined is invalid', () => {
  assertEquals(
    validateArray(undefined, {
      type: 'array',
    }),
    false
  );
});

Deno.test('Number is invalid', () => {
  assertEquals(
    validateArray(0, {
      type: 'array',
    }),
    false
  );
});

Deno.test('Any array is valid when no bound and validator are specified', () => {
  assertEquals(
    validateArray([false, 0, 'hello'], {
      type: 'array',
    }),
    true
  );
});

Deno.test('Array invalid when size is smaller then specified min', () => {
  assertEquals(
    validateArray([0], {
      type: 'array',
      min: 2,
    }),
    false
  );
});

Deno.test('Array valid when size is equal to specified min', () => {
  assertEquals(
    validateArray([0, 0], {
      type: 'array',
      min: 2,
    }),
    true
  );
});

Deno.test('Array valid when size is bigger then specified min', () => {
  assertEquals(
    validateArray([0, 0, 0, 0], {
      type: 'array',
      min: 2,
    }),
    true
  );
});

Deno.test('Array invalid when size is bigger then specified max', () => {
  assertEquals(
    validateArray([0, 0, 0], {
      type: 'array',
      max: 2,
    }),
    false
  );
});

Deno.test('Array valid when size is equal to specified max', () => {
  assertEquals(
    validateArray([0, 0], {
      type: 'array',
      max: 2,
    }),
    true
  );
});

Deno.test('Array valid when size is smaller then specified max', () => {
  assertEquals(
    validateArray([0], {
      type: 'array',
      max: 2,
    }),
    true
  );
});

Deno.test('Array valid when all items match validator', () => {
  assertEquals(
    validateArray([0], {
      type: 'array',
      itemValidator: (item) => true,
    }),
    true
  );
});

Deno.test('Array invalid when one item doesnt match validator', () => {
  assertEquals(
    validateArray([0, 1], {
      type: 'array',
      itemValidator: (item) => item === 0,
    }),
    false
  );
});
