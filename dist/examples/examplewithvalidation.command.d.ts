import { ICommand, ICommandHandler } from "../cqrs";
export declare class ExampleWithValidationCommand implements ICommand {
    readonly hello: string;
    readonly name: string;
    constructor(hello: string, name: string);
}
export declare class ExampleWithValidationCommandHandler implements ICommandHandler<ExampleWithValidationCommand> {
    constructor();
    execute(command: ExampleWithValidationCommand): Promise<{
        loading: boolean;
    }>;
}
