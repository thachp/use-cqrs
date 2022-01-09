import { Service as Injectable } from "typedi";

import { EventsHandler, IEvent, IEventHandler } from "../../cqrs";

export interface IExampledExceptionEvent extends IEvent {}

export class ExampledExceptionEvent implements IExampledExceptionEvent {
    constructor(public readonly hello: string) {}
}

@Injectable()
@EventsHandler(ExampledExceptionEvent)
export class ExampledExceptionEventHandler implements IEventHandler<ExampledExceptionEvent> {
    async handle(event: ExampledExceptionEvent) {
        console.log("gothexception", event.hello);
        throw new Error("Method not implemented.");
    }
}
