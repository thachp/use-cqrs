import { ICommand, ICommandHandler } from "../../..";
import { Injectable } from "../../../cqrs";

@Injectable()
class ExampleInjectedService {
    doSomething() {
        throw new Error("Method not implemented.");
    }
}

export class ExampleWithInjectionCommand implements ICommand {
    constructor(public readonly hello: string, public readonly name: string) {}
}

@Injectable(ExampleWithInjectionCommand)
export class ExampleWithInjectionCommandHandler implements ICommandHandler<ExampleWithInjectionCommand> {
    constructor(public readonly exampleInjectedService: ExampleInjectedService) {}

    async handle(command: ExampleWithInjectionCommand) {
        const { hello, name } = command;

        console.log("example-command-withinjection", hello, name);

        // call injected service
        this.exampleInjectedService.doSomething();
    }
}
