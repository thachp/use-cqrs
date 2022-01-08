import { Service as Injectable } from "typedi";

import { IEvent, IEventHandler } from "../../cqrs";
import { nameOf } from "../../cqrs/operators/of-name";

export interface IExampledExceptionEvent extends IEvent {}

export class ExampledExceptionEvent implements IExampledExceptionEvent {
    public readonly hello: string;

    constructor(hello: string) {
        this.hello = hello;
    }
}

@Injectable(nameOf(ExampledExceptionEvent))
export class ExampledExceptionEventHandler implements IEventHandler<ExampledExceptionEvent> {
    async handle(event: ExampledExceptionEvent) {
        throw new Error("Method not implemented.");
    }
}
