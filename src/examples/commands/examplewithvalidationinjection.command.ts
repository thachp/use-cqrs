import { Contains, MaxLength, MinLength } from "class-validator";
import { Service as Injectable } from "typedi";

import { ICommand, ICommandHandler } from "../../cqrs";

@Injectable()
class ExampleValidationInjectedService {
    printMessage() {
        console.log("I am alive!");
    }
}

export class ExampleWithValidationInjectionCommand implements ICommand {
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

@Injectable(ExampleWithValidationInjectionCommand.name)
export class ExampleWithValidationCommandHandler implements ICommandHandler<ExampleWithValidationInjectionCommand> {
    constructor(public readonly exampleInjectedService: ExampleValidationInjectedService) {}

    async execute(command: ExampleWithValidationInjectionCommand) {
        const { hello, name } = command;

        this.exampleInjectedService.printMessage();
        console.log("example-command-withvalidationinjection", hello, name);

        return {
            loading: false
        };
    }
}
