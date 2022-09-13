import { NumberValidationSchema } from '../validation-schema.ts';

export default function validateNumber(value: unknown, schema: NumberValidationSchema): boolean {
  // Check if the value is of the number type.
  // If not it's not valid and we can stop the validation
  // process.
  if (typeof value !== 'number') {
    return false;
  }

  // Check if a value to match is specified in the schema.
  if (schema.value !== undefined && schema.value !== value) {
    // The value of the number did not match which is invalid.
    return false;
  }

  // Check if a minimum value has been specified in the schema.
  // If so the value has to be bigger or equal to the specified value
  // to be considered valid.
  if (schema.min !== undefined && schema.min > value) {
    // The value was smaller then the specified value which is invalid.
    return false;
  }

  // Check if a maximum value has been specified in the schema.
  // If so the value has to be smaller or equal to the specified value
  // to be considered valid.
  if (schema.max !== undefined && schema.max < value) {
    // The value was bigger then the specified value which is invalid.
    return false;
  }

  // Check custom rules
  if (schema.customRules !== undefined && !schema.customRules.every((rule) => rule(value))) {
    // Not every custom rule returned true so the number is invalid.
    return false;
  }

  return true;
}
