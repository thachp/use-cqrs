import { IEvent } from "./event.interface";
export interface IEventPublisher {
    publish<TEvent extends IEvent>(event: TEvent): Promise<void>;
    publishAll<TEvent extends IEvent>(event: TEvent[]): Promise<void>;
}
export declare class EventPublisher implements EventPublisher {
    publish<TEvent extends IEvent>(event: TEvent): Promise<void>;
    publishAll<TEvent extends IEvent>(events: TEvent[]): Promise<void[]>[];
}
