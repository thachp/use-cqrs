import { EventsHandler, IEvent, IEventHandler } from "../../cqrs";

export interface IExampledEvent extends IEvent {}

export class ExampledEvent implements IExampledEvent {
    constructor(public readonly hello: string) {}
}

@EventsHandler(ExampledEvent)
export class ExampledEventHandler implements IEventHandler<ExampledEvent> {
    async handle(event: ExampledEvent) {
        // logic here
    }
}
