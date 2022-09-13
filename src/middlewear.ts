import { Oak } from '../dependencies.ts';
import {
  ArrayValidationSchema,
  BooleanValidationSchema,
  NumberValidationSchema,
  ObjectValidationSchema,
  StringValidationSchema,
  ValidationSchema,
} from './validation-schema.ts';
import { validate } from './validator.ts';

export const isString = (options?: Omit<StringValidationSchema, 'type'>) => (item: unknown) =>
  validate(item, {
    type: 'string',
    ...options,
  });
export const isNumber = (options?: Omit<NumberValidationSchema, 'type'>) => (item: unknown) =>
  validate(item, {
    type: 'number',
    ...options,
  });
export const isBoolean = (options?: Omit<BooleanValidationSchema, 'type'>) => (item: unknown) =>
  validate(item, {
    type: 'boolean',
    ...options,
  });
export const isArray = (options?: Omit<ArrayValidationSchema, 'type'>) => (item: unknown) =>
  validate(item, {
    type: 'array',
    ...options,
  });
export const isObject = (options?: Omit<ObjectValidationSchema, 'type'>) => (item: unknown) =>
  validate(item, {
    type: 'object',
    ...options,
  });
export const isObjectId = () => isString({ minLength: 24, maxLength: 24 });

export function validateBody(schema: ValidationSchema, failure: (ctx: Oak.Context) => unknown): Oak.Middleware {
  return async (ctx: Oak.Context, next: () => Promise<unknown>) => {
    try {
      const body = await ctx.request.body().value;
      if (!validate(body, schema)) {
        return failure(ctx);
      }
    } catch (e) {
      return failure(ctx);
    }

    return next();
  };
}
