import { CommandHandler, ICommand, ICommandHandler } from "../../cqrs";

export class ExampleCommand implements ICommand {
    constructor(public readonly hello: string, public readonly name: string) {}
}

@CommandHandler(ExampleCommand)
export class ExampleCommandHandler implements ICommandHandler<ExampleCommand> {
    constructor() {}

    async execute(command: ExampleCommand) {
        const { hello, name } = command;

        console.log("example-command", hello, name);
    }
}
