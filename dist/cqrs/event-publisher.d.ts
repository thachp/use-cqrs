import { AggregateRoot } from "./aggregate-root";
import { EventBus } from "./event-bus";
import { IEvent } from "./interfaces";
export interface Constructor<T> {
    new (...args: any[]): T;
}
export declare class EventPublisher<EventBase extends IEvent = IEvent> {
    private readonly eventBus;
    constructor(eventBus: EventBus<EventBase>);
    mergeClassContext<T extends Constructor<AggregateRoot<EventBase>>>(metatype: T): T;
    mergeObjectContext<T extends AggregateRoot<EventBase>>(object: T): T;
}
