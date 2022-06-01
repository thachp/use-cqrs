import { ICommand, ICommandHandler } from "../../..";
import { Injectable } from "../../../cqrs";

export class ExampleCommand implements ICommand {
    constructor(public readonly hello: string, public readonly name: string) {}
}

@Injectable(ExampleCommand)
export class ExampleCommandHandler implements ICommandHandler<ExampleCommand> {
    constructor() {}

    async handle(command: ExampleCommand) {
        const { hello, name } = command;

        console.log("example-command", hello, name);
    }
}

export default ExampleCommandHandler;
