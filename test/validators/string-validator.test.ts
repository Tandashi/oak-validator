import { assertEquals } from '$/testing/asserts.ts';
import validateString from '../../src/validators/string-validator.ts';

Deno.test('Undefined is invalid', () => {
  assertEquals(
    validateString(undefined, {
      type: 'string',
    }),
    false
  );
});

Deno.test('Number is invalid', () => {
  assertEquals(
    validateString(7, {
      type: 'string',
    }),
    false
  );
});

Deno.test('Empty String is considered invalid when allowEmpty is not specified', () => {
  assertEquals(
    validateString('', {
      type: 'string',
    }),
    false
  );
});

Deno.test('Empty String is considered invalid when allowEmpty is false', () => {
  assertEquals(
    validateString('', {
      type: 'string',
      allowEmpty: false,
    }),
    false
  );
});

Deno.test('Empty String is considered valid when allowEmpty is true', () => {
  assertEquals(
    validateString('', {
      type: 'string',
      allowEmpty: true,
    }),
    true
  );
});

Deno.test('String only valid if value matches', () => {
  assertEquals(
    validateString('hello world!', {
      type: 'string',
      value: 'hello world!',
    }),
    true
  );

  assertEquals(
    validateString('hello world!', {
      type: 'string',
      value: 'hello',
    }),
    false
  );
});

Deno.test('String any string is valid when no value is specified', () => {
  assertEquals(
    validateString('hello world!', {
      type: 'string',
    }),
    true
  );
});

Deno.test('String with shorter length then minimum is invalid', () => {
  assertEquals(
    validateString('12345', {
      type: 'string',
      minLength: 6,
    }),
    false
  );
});

Deno.test('String with exact length as minimum is valid', () => {
  assertEquals(
    validateString('12345', {
      type: 'string',
      minLength: 5,
    }),
    true
  );
});

Deno.test('String with longer length as minimum is valid', () => {
  assertEquals(
    validateString('123456', {
      type: 'string',
      minLength: 5,
    }),
    true
  );
});

Deno.test('String with shorter length then maximum is valid', () => {
  assertEquals(
    validateString('12345', {
      type: 'string',
      maxLength: 6,
    }),
    true
  );
});

Deno.test('String with exact length as maximum is valid', () => {
  assertEquals(
    validateString('12345', {
      type: 'string',
      maxLength: 5,
    }),
    true
  );
});

Deno.test('String with longer length as maximum is invalid', () => {
  assertEquals(
    validateString('123456', {
      type: 'string',
      maxLength: 5,
    }),
    false
  );
});

Deno.test('String is valid when customRules are valid', () => {
  assertEquals(
    validateString('123456', {
      type: 'string',
      customRules: [(value) => value.length === 6],
    }),
    true
  );
});

Deno.test('String is invalid when customRules are invalid', () => {
  assertEquals(
    validateString('123456', {
      type: 'string',
      customRules: [(value) => value.length === 1],
    }),
    false
  );
});

Deno.test('String is invalid when one customRule is invalid', () => {
  assertEquals(
    validateString('123456', {
      type: 'string',
      customRules: [(value) => value === '123456', (value) => value.length === 1],
    }),
    false
  );
});
