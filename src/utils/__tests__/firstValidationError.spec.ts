import "reflect-metadata";

import { validate } from "class-validator";

import { firstValidationError } from "../errorsFormatter";
import ExampleNestedValidationInput from "./fixtures/examplenestedvalidation.input";
import ExampleValidationInput from "./fixtures/examplevalidation.input";

describe("Test firstValidationError", () => {
    test("should parse correctly, given one level of validation", async () => {
        // arrange
        const validationErrors = await validate(new ExampleValidationInput("", ""));

        // act
        const error = firstValidationError(validationErrors);

        // assert
        expect(error).toContain("Hello must contain");
    });

    test("should parse correctly, given multiple level of validation", async () => {
        // arrange
        const validationErrors = await validate(
            new ExampleNestedValidationInput("", new ExampleValidationInput("", ""))
        );

        // act
        const error = firstValidationError(validationErrors);

        // assert
        expect(error).toContain("Example must contain");
    });
});
