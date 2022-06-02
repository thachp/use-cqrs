import { ICommand, ICommandHandler } from "../../..";
export declare class ExampleCommand implements ICommand {
    readonly hello: string;
    readonly name: string;
    constructor(hello: string, name: string);
}
export declare class ExampleCommandHandler implements ICommandHandler<ExampleCommand> {
    constructor();
    handle(command: ExampleCommand): Promise<void>;
}
export default ExampleCommandHandler;
