import { Service as Injectable } from "typedi";

import { ICommand, ICommandHandler } from "../../cqrs";

@Injectable()
class ExampleInjectedService {
    doSomething() {
        throw new Error("Method not implemented.");
    }
}

export class ExampleWithInjectionCommand implements ICommand {
    public readonly hello: string;
    public readonly name: string;

    constructor(hello: string, name: string) {
        this.hello = hello;
        this.name = name;
    }
}

@Injectable(ExampleWithInjectionCommand.name)
export class ExampleWithInjectionCommandHandler implements ICommandHandler<ExampleWithInjectionCommand> {
    constructor(public readonly exampleInjectedService: ExampleInjectedService) {}

    async execute(command: ExampleWithInjectionCommand) {
        const { hello, name } = command;

        // call injected service
        try {
            this.exampleInjectedService.doSomething();
        } catch (error) {
            return {
                loading: false,
                errors: [error]
            };
        }

        return {
            loading: false
        };
    }
}
