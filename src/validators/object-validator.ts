import { ObjectValidationSchema } from '../validation-schema.ts';
import { validate } from '../validator.ts';

export default function validateObject(value: unknown, schema: ObjectValidationSchema): boolean {
  // Check if the value is of the object type.
  // If not it's invalid and we can stop the validation
  // process.

  if (typeof value !== 'object') {
    return false;
  }

  if (value === null) {
    return false;
  }

  // Check if every required property is present
  if (schema.required !== undefined && !schema.required.every((v) => Object.keys(value).includes(v))) {
    return false;
  }

  // Check if properties have been specified that should be checked against.
  if (
    schema.properties !== undefined &&
    // Check if all object properties are valid. If one is invalid the
    // whole object is considered invalid.
    !Object.entries(schema.properties).every(([key, property]) => {
      const valueField = (value as Record<string, unknown>)[key];

      // Check if field is defined.
      // If so we need to validate it as well.
      if (valueField !== undefined && !validate(valueField, property)) {
        // Field did not match the specified schema which is invalid.
        return false;
      }

      // Field is valid
      return true;
    })
  ) {
    // Not every object property was valid so the object is considered invalid.
    return false;
  }

  // Check custom rules
  if (
    schema.customRules !== undefined &&
    !schema.customRules.every((rule) => rule(value as Record<string | number | symbol, unknown>))
  ) {
    // Not every custom rule returned true so the object is invalid.
    return false;
  }

  return true;
}
