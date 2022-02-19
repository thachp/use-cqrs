"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.firstError = exports.firstValidationError = exports.flattenValidationErrors = void 0;
const class_validator_1 = require("class-validator");
const iterare_1 = require("iterare");
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
function prependConstraintsWithParentProp(parentPath, error) {
    const constraints = {};
    for (const key in error.constraints) {
        constraints[key] = `${parentPath}.${error.constraints[key]}`;
    }
    return Object.assign(Object.assign({}, error), { constraints });
}
function mapChildrenToValidationErrors(error, parentPath) {
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
function flattenValidationErrors(validationErrors) {
    return (0, iterare_1.default)(validationErrors)
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
exports.flattenValidationErrors = flattenValidationErrors;
/**
 * Get the first error message from the list of validation errors
 * @param validationErrors The validation errors to parse
 * @returns string the first error message
 */
function firstValidationError(validationErrors) {
    const validationError = flattenValidationErrors(validationErrors)[0];
    const [field, ...rest] = validationError.split(" ");
    const fieldName = field.split(".");
    const messages = [...fieldName, ...rest].join(" ");
    return messages.charAt(0).toUpperCase() + messages.slice(1);
}
exports.firstValidationError = firstValidationError;
/**
 * Get the first validation error from the list of validation errors
 * and return the first error in string format
 * @author thachp
 * @param error The validation errors to format
 * @returns The formatted error message
 **/
function firstError(error, errorMessage = "An error has occurred") {
    if ((0, class_validator_1.isArray)(error) && error[0] instanceof class_validator_1.ValidationError) {
        return firstValidationError(error);
    }
    if (error instanceof Error) {
        return error.message || errorMessage;
    }
    return errorMessage;
}
exports.firstError = firstError;
