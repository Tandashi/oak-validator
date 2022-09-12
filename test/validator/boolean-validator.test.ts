import { assertEquals } from '$/testing/asserts.ts';
import validateBoolean from '../../src/validators/boolean-validator.ts';

Deno.test('Undefined is invalid', () => {
  assertEquals(
    validateBoolean(undefined, {
      type: 'boolean',
    }),
    false
  );
});

Deno.test('Number is invalid', () => {
  assertEquals(
    validateBoolean(0, {
      type: 'boolean',
    }),
    false
  );
});

Deno.test('Any boolean is valid when no value specified', () => {
  assertEquals(
    validateBoolean(true, {
      type: 'boolean',
    }),
    true
  );
  assertEquals(
    validateBoolean(false, {
      type: 'boolean',
    }),
    true
  );
});

Deno.test('Only specified boolean is valid', () => {
  assertEquals(
    validateBoolean(true, {
      type: 'boolean',
      value: false,
    }),
    false
  );
  assertEquals(
    validateBoolean(false, {
      type: 'boolean',
      value: false,
    }),
    true
  );
});
