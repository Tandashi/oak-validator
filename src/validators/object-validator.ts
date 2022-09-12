import { ObjectValidationSchema } from '../validation-schema.ts';
import { validate } from '../validator.ts';

export default function validateObject(value: unknown, schema: ObjectValidationSchema): boolean {
  // Check if the value is of the object type.
  // If not it's invalid and we can stop the validation
  // process.
  if (typeof value !== 'object') {
    return false;
  }

  // Check if properties have been specified that should be checked against.
  if (
    schema.properties !== undefined &&
    // Check if all object properties are valid. If one is invalid the
    // whole object is considered invalid.
    !Object.entries(schema.properties).every(([key, property]) => {
      const valueField = (value as Record<string, unknown>)[key];
      // Check if property is a shorthand
      if (typeof property === 'string') {
        property = {
          required: false,
          schema: property,
        };
      }

      // Check if field exists when it's not optional
      if ((property.required ?? false) && valueField === undefined) {
        // Field did not exist although it's not optional which is invalid.
        return false;
      }

      // Check if field is defined.
      // If so we need to validate it as well.
      if (valueField !== undefined && !validate(valueField, property.schema)) {
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

  return true;
}
