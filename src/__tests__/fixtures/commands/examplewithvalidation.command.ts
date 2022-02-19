import { MaxLength, MinLength, Validate } from "class-validator";

import { Injectable } from "../../..";
import { CommandHandler, ICommand, ICommandHandler } from "../../../cqrs";
import { MatchTextValidator } from "../validators/matchtext.validator";

export class ExampleWithValidationCommand implements ICommand {
    @Validate(MatchTextValidator)
    public readonly hello: string;

    @MinLength(2)
    @MaxLength(5)
    public readonly name: string;

    constructor(hello: string, name: string) {
        this.hello = hello;
        this.name = name;
    }
}

@Injectable()
@CommandHandler(ExampleWithValidationCommand)
export class ExampleWithValidationCommandHandler implements ICommandHandler<ExampleWithValidationCommand> {
    constructor() {}

    async execute(command: ExampleWithValidationCommand) {
        const { hello, name } = command;
        console.log("example-command-withvalidation", hello, name);
    }
}
