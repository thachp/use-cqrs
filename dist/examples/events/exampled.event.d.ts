import { IEvent, IEventHandler } from "../../cqrs";
export interface IExampledEvent extends IEvent {
}
export declare class ExampledEvent implements IExampledEvent {
    readonly hello: string;
    constructor(hello: string);
}
export declare class ExampledEventHandler implements IEventHandler<ExampledEvent> {
    handle(event: ExampledEvent): Promise<void>;
}
