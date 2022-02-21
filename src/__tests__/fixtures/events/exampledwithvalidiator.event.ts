import { Contains, IsString, Validate } from "class-validator";
import { Service as Injectable } from "typedi";

import { EventsHandler, IEvent, IEventHandler } from "../../../cqrs";
import { MatchTextValidator } from "../validators/matchtext.validator";

export interface IExampledEvent extends IEvent {}

export class ExampledWithValidatorEvent implements IExampledEvent {
    @IsString()
    @Contains("patrick")
    public readonly name: string;

    @IsString()
    @Validate(MatchTextValidator)
    public readonly hello: string;

    constructor(hello: string, name: string) {
        this.name = name;
        this.hello = hello;
    }
}

@Injectable()
@EventsHandler(ExampledWithValidatorEvent)
export class ExampledWithValidatorEventHandler implements IEventHandler<ExampledWithValidatorEvent> {
    async handle(event: ExampledWithValidatorEvent) {
        // logic here
        console.log("handling", ExampledWithValidatorEvent.name);
    }
}
