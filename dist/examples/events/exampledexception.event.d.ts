import { IEvent, IEventHandler } from "../../cqrs";
export interface IExampledExceptionEvent extends IEvent {
}
export declare class ExampledExceptionEvent implements IExampledExceptionEvent {
    readonly hello: string;
    constructor(hello: string);
}
export declare class ExampledExceptionEventHandler implements IEventHandler<ExampledExceptionEvent> {
    handle(event: ExampledExceptionEvent): Promise<void>;
}
