import { ICommand, ICommandHandler } from "../cqrs";
export declare class ExampleCommand implements ICommand {
    readonly hello: string;
    readonly name: string;
    constructor(...args: any[]);
}
export declare class ExampleCommandHandler implements ICommandHandler<ExampleCommand> {
    constructor();
    execute(command: ExampleCommand): Promise<{
        loading: boolean;
        errors: any[];
    }>;
}
