import { Contains, MaxLength, MinLength } from "class-validator";
import { Service as Injectable } from "typedi";

import { ICommand, ICommandHandler } from "../../cqrs";

export class ExampleWithValidationCommand implements ICommand {
    @Contains("hello")
    public readonly hello: string;

    @MinLength(2)
    @MaxLength(5)
    public readonly name: string;

    constructor(hello: string, name: string) {
        this.hello = hello;
        this.name = name;
    }
}

@Injectable(ExampleWithValidationCommand.name)
export class ExampleWithValidationCommandHandler implements ICommandHandler<ExampleWithValidationCommand> {
    constructor() {}

    async execute(command: ExampleWithValidationCommand) {
        const { hello, name } = command;
        console.log("example-command-withvalidation", hello, name);
    }
}
