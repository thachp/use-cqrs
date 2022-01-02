import { Contains, MaxLength, MinLength } from "class-validator";
import { Service } from "typedi";

import { ICommand, ICommandHandler } from "../cqrs";

@Service()
class ExampleInjectedService {
    printMessage() {
        console.log("I am alive!");
    }
}

export class ExampleWithInjectionCommand implements ICommand {
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

@Service(ExampleWithInjectionCommand.name)
export class ExampleWithInjectionCommandHandler implements ICommandHandler<ExampleWithInjectionCommand> {
    constructor(public readonly exampleInjectedService: ExampleInjectedService) {}

    async execute(command: ExampleWithInjectionCommand) {
        const { hello, name } = command;

        // call injected service
        this.exampleInjectedService.printMessage();

        // log
        console.log("example-command-withinjection", hello, name);

        return {
            loading: false
        };
    }
}
