import "reflect-metadata";

import { validate } from "class-validator";

import { flattenValidationErrors } from "../errorsFormatter";
import ExampleNestedValidationInput from "./fixtures/examplenestedvalidation.input";
import ExampleValidationInput from "./fixtures/examplevalidation.input";

describe("Test FlattenValidationErrors", () => {
    test("should parse correctly, given one level of validation", async () => {
        // arrange
        const validationErrors = await validate(new ExampleValidationInput("", ""));

        // act
        const errors = flattenValidationErrors(validationErrors);

        // assert
        expect(errors.length).toBe(2);
        expect(errors[0]).toContain("hello must contain");
        expect(errors[1]).toContain("name must be longer than");
    });

    test("should parse correctly, given multiple level of validation", async () => {
        // arrange
        const validationErrors = await validate(
            new ExampleNestedValidationInput("", new ExampleValidationInput("", ""))
        );

        // act
        const errors = flattenValidationErrors(validationErrors);

        // assert
        expect(errors.length).toBe(3);
        expect(errors[0]).toContain("example must contain");
        expect(errors[1]).toContain("command.hello must contain");
        expect(errors[2]).toContain("command.name must be longer than");
    });
});
