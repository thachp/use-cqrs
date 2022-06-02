import { ICommand, ICommandHandler } from "../../..";
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
    handle(command: ExampleWithInjectionCommand): Promise<void>;
}
export {};
