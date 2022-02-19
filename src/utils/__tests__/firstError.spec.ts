import "reflect-metadata";

import { validate } from "class-validator";

import { firstError } from "../errorsFormatter";
import ExampleNestedValidationInput from "./fixtures/examplenestedvalidation.input";
import ExampleValidationInput from "./fixtures/examplevalidation.input";

describe("Test firstError", () => {
    test("should parse correctly, given one level of validation", async () => {
        // arrange
        const validationErrors = await validate(new ExampleValidationInput("", ""));

        // act
        const error = firstError(validationErrors);

        // assert
        expect(error).toContain("Hello must contain");
    });

    test("should parse correctly, given multiple level of validation", async () => {
        // arrange
        const validationErrors = await validate(
            new ExampleNestedValidationInput("", new ExampleValidationInput("", ""))
        );

        // act
        const error = firstError(validationErrors);

        // assert
        expect(error).toContain("Example must contain");
    });

    test("should parse error message, given Error exception", async () => {
        // arrange
        const validationErrors = new Error("Example: An error has occurred");
        // act
        const error = firstError(validationErrors);

        // assert
        expect(error).toContain("Example: An error has occurred");
    });

    test("should parse custom error message, given Error exception", async () => {
        // arrange
        const validationErrors = new Error();
        // act
        const error = firstError(validationErrors, "Custom error message");

        // assert
        expect(error).toContain("Custom error message");
    });
});
