import { IEvent, IEventHandler } from "../../cqrs";

export interface IExampledEvent extends IEvent {}

export class ExampledEvent implements IExampledEvent {
    public readonly $type: string = "exampled.event";

    constructor() {}
}

export class ExampledEventHandler implements IEventHandler<ExampledEvent> {
    async handle(event: ExampledEvent) {
        // do something
        throw new Error("Method not implemented.");
    }
}
