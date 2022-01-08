import { EventsHandler, IEvent, IEventHandler } from "../../cqrs";

export interface IExampledExceptionEvent extends IEvent {}

export class ExampledExceptionEvent implements IExampledExceptionEvent {
    constructor(public readonly hello: string) {}
}

@EventsHandler(ExampledExceptionEvent)
export class ExampledExceptionEventHandler implements IEventHandler<ExampledExceptionEvent> {
    async handle(event: ExampledExceptionEvent) {
        throw new Error("Method not implemented.");
    }
}
