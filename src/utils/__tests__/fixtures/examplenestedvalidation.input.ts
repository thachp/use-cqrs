import { Type } from "class-transformer";
import { Contains, ValidateNested } from "class-validator";

import { ExampleValidationInput } from "./examplevalidation.input";

export class ExampleNestedValidationInput {
    @Contains("example")
    public readonly example: string;

    @ValidateNested()
    @Type(() => ExampleValidationInput)
    public readonly command: ExampleValidationInput;

    constructor(example: string, command: ExampleValidationInput) {
        this.example = example;
        this.command = command;
    }
}

export default ExampleNestedValidationInput;
