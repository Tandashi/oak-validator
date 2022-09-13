import { assertEquals } from '$/testing/asserts.ts';
import validateObject from '../../src/validators/object-validator.ts';

Deno.test('Undefined is invalid', () => {
  assertEquals(
    validateObject(undefined, {
      type: 'object',
      properties: {},
    }),
    false
  );
});

Deno.test('Number is invalid', () => {
  assertEquals(
    validateObject(0, {
      type: 'object',
      properties: {},
    }),
    false
  );
});

Deno.test('Empty Object is valid', () => {
  assertEquals(
    validateObject(
      {},
      {
        type: 'object',
        properties: {},
      }
    ),
    true
  );
});

Deno.test('Object with non specified required is valid', () => {
  assertEquals(
    validateObject(
      {},
      {
        type: 'object',
        properties: {
          optionalValue: {
            type: 'string',
          },
        },
      }
    ),
    true
  );
});

Deno.test('Object with specified required field but wrong type is invalid', () => {
  assertEquals(
    validateObject(
      {
        optionalValue: 0,
      },
      {
        type: 'object',
        properties: {
          optionalValue: {
            type: 'string',
          },
        },
      }
    ),
    false
  );
});

Deno.test('Object with specified required field and correct type is valid', () => {
  assertEquals(
    validateObject(
      {
        optionalValue: '1',
      },
      {
        type: 'object',
        properties: {
          optionalValue: {
            type: 'string',
          },
        },
      }
    ),
    true
  );
});

Deno.test('Object with shortform types is valid', () => {
  assertEquals(
    validateObject(
      {
        optionalString: '1',
        optionalNumber: 0,
        optionalBoolean: false,
        optionalArray: [0, false, 'hello world'],
        optionalObject: {
          randomValue: false,
        },
      },
      {
        type: 'object',
        properties: {
          optionalString: 'string',
          optionalNumber: 'number',
          optionalBoolean: 'boolean',
          optionalArray: 'array',
          optionalObject: 'object',
        },
      }
    ),
    true
  );
});

Deno.test('Object with shortform incorrect types is invalid', () => {
  assertEquals(
    validateObject(
      {
        optionalString: 0,
        optionalNumber: 0,
        optionalBoolean: false,
        optionalArray: [0, false, 'hello world'],
        optionalObject: {
          randomValue: false,
        },
      },
      {
        type: 'object',
        properties: {
          optionalString: 'string',
          optionalNumber: 'number',
          optionalBoolean: 'boolean',
          optionalArray: 'array',
          optionalObject: 'object',
        },
      }
    ),
    false
  );
});

Deno.test('Object with ultra-shortform correct types is valid', () => {
  assertEquals(
    validateObject(
      {
        optionalString: '1',
        optionalNumber: 0,
        optionalBoolean: false,
        optionalArray: [0, false, 'hello world'],
        optionalObject: {
          randomValue: false,
        },
      },
      {
        type: 'object',
        properties: {
          optionalString: 'string',
          optionalNumber: 'number',
          optionalBoolean: 'boolean',
          optionalArray: 'array',
          optionalObject: 'object',
        },
      }
    ),
    true
  );
});

Deno.test('Object with ultra-shortform incorrect types is invalid', () => {
  assertEquals(
    validateObject(
      {
        optionalString: 0,
        optionalNumber: 0,
        optionalBoolean: false,
        optionalArray: [0, false, 'hello world'],
        optionalObject: {
          randomValue: false,
        },
      },
      {
        type: 'object',
        properties: {
          optionalString: 'string',
          optionalNumber: 'number',
          optionalBoolean: 'boolean',
          optionalArray: 'array',
          optionalObject: 'object',
        },
      }
    ),
    false
  );
});

Deno.test('Object is valid when customRules are valid', () => {
  assertEquals(
    validateObject(
      {
        a: 'hi',
      },
      {
        type: 'object',
        customRules: [(value) => value['a'] !== undefined],
      }
    ),
    true
  );
});

Deno.test('Object is invalid when customRules are invalid', () => {
  assertEquals(
    validateObject(
      {},
      {
        type: 'object',
        customRules: [(value) => value['a'] !== undefined],
      }
    ),
    false
  );
});

Deno.test('Object is invalid when one customRule is invalid', () => {
  assertEquals(
    validateObject(
      {},
      {
        type: 'object',
        customRules: [() => true, () => false],
      }
    ),
    false
  );
});

Deno.test('Object is invalid when required property is not set', () => {
  assertEquals(
    validateObject(
      {},
      {
        type: 'object',
        required: ['hello'],
      }
    ),
    false
  );
});

Deno.test('Object is valid when all required properties are set', () => {
  assertEquals(
    validateObject(
      {
        hello: 1,
      },
      {
        type: 'object',
        required: ['hello'],
      }
    ),
    true
  );
});

Deno.test('Object is valid when strict mode is active and only specified properties are supplied', () => {
  assertEquals(
    validateObject(
      {
        hello: 1,
      },
      {
        type: 'object',
        properties: {
          hello: 'number',
        },
        strict: true,
      }
    ),
    true
  );
});

Deno.test('Object is valid when strict mode is active and optional specified properties is not supplied', () => {
  assertEquals(
    validateObject(
      {},
      {
        type: 'object',
        properties: {
          hello: 'number',
        },
        strict: true,
      }
    ),
    true
  );
});

Deno.test('Object is invalid when strict mode is active and more then specified properties are supplied', () => {
  assertEquals(
    validateObject(
      {
        hello: 1,
        world: 2,
      },
      {
        type: 'object',
        properties: {
          hello: 'number',
        },
        strict: true,
      }
    ),
    false
  );
});
