import { ExampleValidationInput } from "./examplevalidation.input";
export declare class ExampleNestedValidationInput {
    readonly example: string;
    readonly command: ExampleValidationInput;
    constructor(example: string, command: ExampleValidationInput);
}
export default ExampleNestedValidationInput;
