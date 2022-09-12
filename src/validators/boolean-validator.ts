import { BooleanValidationSchema } from '../validation-schema.ts';

export default function validateBoolean(value: unknown, schema: BooleanValidationSchema): boolean {
  // Check if the value is of the boolean type.
  // If not it's invalid and we can stop the validation
  // process.
  if (typeof value !== 'boolean') {
    return false;
  }

  // Check if a value to match is specified in the schema.
  if (schema.value !== undefined && schema.value !== value) {
    // The value of the boolean did not match which is invalid.
    return false;
  }

  return true;
}
