import { Service as Injectable } from "typedi";

import { IEvent, IEventHandler } from "../../cqrs";
import { nameOf } from "../../cqrs/operators/of-name";

export interface IExampledEvent extends IEvent {}

export class ExampledEvent implements IExampledEvent {
    public readonly hello: string;

    constructor(hello: string) {
        this.hello = hello;
    }
}

@Injectable(nameOf(ExampledEvent))
export class ExampledEventHandler implements IEventHandler<ExampledEvent> {
    async handle(event: ExampledEvent) {
        throw new Error("Method not implemented.");
    }
}
