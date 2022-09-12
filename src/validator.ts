import { ValidationSchema, ValidationType } from './validation-schema.ts';

import * as Validator from './validators/validators.ts';

function convertValidationTypeToSchema(type: ValidationType): ValidationSchema {
  return <ValidationSchema>{
    type: type,
  };
}

export function validate(value: unknown, schema: ValidationSchema | ValidationType): boolean {
  const unifiedSchema = typeof schema === 'string' ? convertValidationTypeToSchema(schema) : schema;

  switch (unifiedSchema.type) {
    case 'string':
      return Validator.validateString(value, unifiedSchema);

    case 'number':
      return Validator.validateNumber(value, unifiedSchema);

    case 'boolean':
      return Validator.validateBoolean(value, unifiedSchema);

    case 'object':
      return Validator.validateObject(value, unifiedSchema);

    case 'array':
      return Validator.validateArray(value, unifiedSchema);

    default:
      return false;
  }
}
