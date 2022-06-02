import { Service } from "typedi";

import cqrs from "../cqrs.config";
import { IEvent } from "./event.interface";

export interface IEventPublisher {
    publish<TEvent extends IEvent>(event: TEvent): Promise<void>;
    publishAll<TEvent extends IEvent>(event: TEvent[]): Promise<void>;
}

@Service()
export class EventPublisher implements EventPublisher {
    public async publish<TEvent extends IEvent>(event: TEvent): Promise<void> {
        cqrs.publish(event);
    }

    publishAll<TEvent extends IEvent>(events: TEvent[]) {
        return (events || []).map((event) => cqrs.publish(event));
    }
}
