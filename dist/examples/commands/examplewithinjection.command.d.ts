import { ICommand, ICommandHandler } from "../../cqrs";
declare class ExampleInjectedService {
    doSomething(): void;
}
export declare class ExampleWithInjectionCommand implements ICommand {
    readonly hello: string;
    readonly name: string;
    constructor(hello: string, name: string);
}
export declare class ExampleWithInjectionCommandHandler implements ICommandHandler<ExampleWithInjectionCommand> {
    readonly exampleInjectedService: ExampleInjectedService;
    constructor(exampleInjectedService: ExampleInjectedService);
    execute(command: ExampleWithInjectionCommand): Promise<void>;
}
export {};
