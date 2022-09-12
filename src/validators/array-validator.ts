import { ArrayValidationSchema } from '../validation-schema.ts';

export default function validateArray(value: unknown, schema: ArrayValidationSchema): boolean {
  // Check if the value is of the array type.
  // If not it's not valid and we can stop the validation
  // process.
  if (!Array.isArray(value)) {
    return false;
  }

  // Check if a minimum size has been specified in the schema.
  // If so the size has to be bigger or equal to the specified value
  // to be considered valid.
  if (schema.min !== undefined && schema.min > value.length) {
    // The size was smaller then the specified valwue which is invalid.
    return false;
  }

  // Check if a maximum size has been specified in the schema.
  // If so the size has to be smaller or equal to the specified value
  // to be considered valid.
  if (schema.max !== undefined && schema.max < value.length) {
    // The size was bigger then the specified value which is invalid.
    return false;
  }

  // Check if an item validator has been specified in the schema.
  // If so all the items in the array have to be valid for the array
  // to be considered valid.
  if (schema.itemValidator !== undefined && !value.every(schema.itemValidator)) {
    // Not every item in the array was valid which is invalid.
    return false;
  }

  return true;
}
