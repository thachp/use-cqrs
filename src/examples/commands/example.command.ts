import { Service as Injectable } from "typedi";

import { ICommand, ICommandHandler } from "../../cqrs";

export class ExampleCommand implements ICommand {
    public readonly hello: string;
    public readonly name: string;

    constructor(hello: string, name: string) {
        this.hello = hello;
        this.name = name;
    }
}

@Injectable(ExampleCommand.name)
export class ExampleCommandHandler implements ICommandHandler<ExampleCommand> {
    constructor() {}

    async execute(command: ExampleCommand) {
        const { hello, name } = command;

        console.log("example-command", hello, name);

        return {
            loading: false,
            errors: []
        };
    }
}
