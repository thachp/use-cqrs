import { ValidationError } from "class-validator";
/**
 * Parse the validation errors and flatten them into a single array
 * @author kamilmysliwiec
 * @see https://github.com/nestjs/nest/blob/master/packages/common/pipes/validation.pipe.ts
 * @param validationErrors The validation errors to parse
 * @returns The flattened array of validation errors
 */
export declare function flattenValidationErrors(validationErrors: ValidationError[]): string[];
/**
 * Get the first error message from the list of validation errors
 * @param validationErrors The validation errors to parse
 * @returns string the first error message
 */
export declare function firstValidationError(validationErrors: ValidationError[]): string;
/**
 * Get the first validation error from the list of validation errors
 * and return the first error in string format
 * @author thachp
 * @param error The validation errors to format
 * @returns The formatted error message
 **/
export declare function firstError(error: Error | ValidationError[]): string;
