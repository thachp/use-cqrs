import { ICommand, ICommandHandler } from "../cqrs";
declare class ExampleValidationInjectedService {
    printMessage(): void;
}
export declare class ExampleWithValidationInjectionCommand implements ICommand {
    readonly hello: string;
    readonly name: string;
    constructor(hello: string, name: string);
}
export declare class ExampleWithValidationCommandHandler implements ICommandHandler<ExampleWithValidationInjectionCommand> {
    readonly exampleInjectedService: ExampleValidationInjectedService;
    constructor(exampleInjectedService: ExampleValidationInjectedService);
    execute(command: ExampleWithValidationInjectionCommand): Promise<{
        loading: boolean;
    }>;
}
export {};
