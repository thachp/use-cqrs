import { Contains, Length } from "class-validator";

export class ExampleValidationInput {
    @Contains("hello")
    public readonly hello: string;

    @Length(4, 30)
    public readonly name: string;

    constructor(hello: string, name: string) {
        this.hello = hello;
        this.name = name;
    }
}

export default ExampleValidationInput;
