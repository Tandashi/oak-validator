import { StringValidationSchema } from '../validation-schema.ts';

export default function validateString(value: unknown, schema: StringValidationSchema): boolean {
  // Check if the value is of the string type.
  // If not it's invalid and we can stop the validation
  // process.
  if (typeof value !== 'string') {
    return false;
  }

  // Check if allowEmpty is specified in the schema.
  if (!(schema.allowEmpty ?? false) && value === '') {
    // The value was empty which is not allowed thus invalid.
    return false;
  }

  // Check if a value to match is specified in the schema.
  if (schema.value !== undefined && schema.value !== value) {
    // The value did not match which is invalid.
    return false;
  }

  // Check if a minimum length has been specified in the schema.
  // If so the value length has to be higher or equal to the specified value
  // to be considered valid.
  if (schema.minLength !== undefined && schema.minLength > value.length) {
    // The value length was smaller then the specified value which is invalid.
    return false;
  }

  // Check if a maximum length has been specified in the schema.
  // If so the value length has to be smaller or equal to the specified value
  // to be considered valid.
  if (schema.maxLength !== undefined && schema.maxLength < value.length) {
    // The value length was higher then the specified value which is invalid.
    return false;
  }

  return true;
}
