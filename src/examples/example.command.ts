import { Service } from "typedi";

import { ICommand, ICommandHandler } from "../cqrs";

export class ExampleCommand implements ICommand {
    public readonly hello: string;
    public readonly name: string;

    constructor(...args: any[]) {
        this.hello = args[0];
        this.name = args[1];
    }
}

@Service(ExampleCommand.name)
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
