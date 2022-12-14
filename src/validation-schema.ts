export type ValidationSchema =
  | ObjectValidationSchema
  | ArrayValidationSchema
  | StringValidationSchema
  | NumberValidationSchema
  | BooleanValidationSchema;

export type ValidationType = 'object' | 'array' | 'string' | 'number' | 'boolean';

interface BaseValidationSchema {
  type: ValidationType;
}

export interface ObjectValidationSchema extends BaseValidationSchema {
  type: 'object';
  /**
   * The properties of the object.
   * If not specified any object is considered valid.
   */
  properties?: {
    [k: string]: ValidationSchema | ValidationType;
  };

  /**
   * The properties that are required to exist.
   */
  required?: string[];

  /**
   * If set the object is only considered valid when only the specified properties have
   * been supplied.
   */
  strict?: boolean;

  /**
   * A set of custom rules that need to be valid for the object to be considered
   * valid as well.
   */
  customRules?: ((value: Record<string | number | symbol, unknown>) => boolean)[];
}

/**
 *
 */
export interface ArrayValidationSchema extends BaseValidationSchema {
  type: 'array';
  /**
   * The minimum size of the array
   */
  min?: number;
  /**
   * The maximum size of the array
   */
  max?: number;
  /**
   * A function to validate the items in the array.
   *
   * If specified the array will only be considered valid when the function
   * returns `true` for every array item.
   *
   * If not specified any array that matches the other citeria will be considered valid.
   */
  itemValidator?: (item: unknown, index: number, array: unknown[]) => boolean;
}

/**
 *
 */
export interface StringValidationSchema extends BaseValidationSchema {
  type: 'string';

  /**
   * Weather an empty string is considered valid or not.
   * If not specified empty strings are considered invalid.
   */
  allowEmpty?: boolean;

  /**
   * The value that should be matched exactly.
   * If not specified any string is considered valid.
   */
  value?: string;

  /**
   * The minimum length the string has to have to be considered valid.
   */
  minLength?: number;

  /**
   * The maximum length the string can have to be considered valid.
   */
  maxLength?: number;

  /**
   * A set of custom rules that need to be valid for the string to be considered
   * valid as well.
   */
  customRules?: ((value: string) => boolean)[];
}

/**
 *
 */
export interface NumberValidationSchema extends BaseValidationSchema {
  type: 'number';
  /**
   * The minimum value the number has to have
   */
  min?: number;
  /**
   * The maximum value the number can have
   */
  max?: number;
  /**
   * The value that should be matched exactly.
   * If not specified any number is considered valid.
   */
  value?: number;

  /**
   * A set of custom rules that need to be valid for the number to be considered
   * valid as well.
   */
  customRules?: ((value: number) => boolean)[];
}

/**
 *
 */
export interface BooleanValidationSchema extends BaseValidationSchema {
  type: 'boolean';
  /**
   * The value that should be matched exactly.
   * If not specified any boolean is considered valid.
   */
  value?: boolean;
}
