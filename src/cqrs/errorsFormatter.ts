import { isArray, ValidationError } from "class-validator";
import iterate from "iterare";

/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
function prependConstraintsWithParentProp(parentPath: string, error: ValidationError): ValidationError {
    const constraints: any = {};

    for (const key in error.constraints) {
        constraints[key] = `${parentPath}.${error.constraints[key]}`;
    }
    return {
        ...error,
        constraints
    };
}

function mapChildrenToValidationErrors(error: ValidationError, parentPath?: string): ValidationError[] {
    if (!(error.children && error.children.length)) {
        return [error];
    }
    const validationErrors = [];
    // eslint-disable-next-line no-param-reassign
    parentPath = parentPath ? `${parentPath}.${error.property}` : error.property;
    for (const item of error.children) {
        if (item.children && item.children.length) {
            validationErrors.push(...mapChildrenToValidationErrors(item, parentPath));
        }
        validationErrors.push(prependConstraintsWithParentProp(parentPath, item));
    }
    return validationErrors;
}

/**
 * Parse the validation errors and flatten them into a single array
 * @author kamilmysliwiec
 * @see https://github.com/nestjs/nest/blob/master/packages/common/pipes/validation.pipe.ts
 * @param validationErrors The validation errors to parse
 * @returns The flattened array of validation errors
 */

export function flattenValidationErrors(validationErrors: ValidationError[]): string[] {
    return iterate(validationErrors)
        .map((error) => mapChildrenToValidationErrors(error))
        .flatten()
        .filter((item) => !!item.constraints)
        .map((item) => {
            const { constraints = {} } = item;
            return Object.values(constraints);
        })
        .flatten()
        .toArray();
}

/**
 * Get the first error message from the list of validation errors
 * @param validationErrors The validation errors to parse
 * @returns string the first error message
 */
export function firstValidationError(validationErrors: ValidationError[]): string {
    const validationError = flattenValidationErrors(validationErrors)[0];
    const [field, ...rest] = validationError.split(" ");

    const fieldName = field.split(".");
    const messages = [...fieldName, ...rest].join(" ");

    return messages.charAt(0).toUpperCase() + messages.slice(1);
}

/**
 * Get the first validation error from the list of validation errors
 * and return the first error in string format
 * @author thachp
 * @param error The validation errors to format
 * @returns The formatted error message
 **/
export function firstError(error: Error | ValidationError[], errorMessage = "An error has occurred"): string {
    if (isArray(error) && (error as any)[0] instanceof ValidationError) {
        return firstValidationError(error as any);
    }
    if (error instanceof Error) {
        return error.message || errorMessage;
    }

    return errorMessage;
}
