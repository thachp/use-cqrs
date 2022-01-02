import { IEvent, IEventHandler } from "./interfaces";
import { Type } from "./interfaces/type.interface";
declare const INTERNAL_EVENTS: unique symbol;
declare const IS_AUTO_COMMIT_ENABLED: unique symbol;
export declare abstract class AggregateRoot<EventBase extends IEvent = IEvent> {
    [IS_AUTO_COMMIT_ENABLED]: boolean;
    private readonly [INTERNAL_EVENTS];
    set autoCommit(value: boolean);
    get autoCommit(): boolean;
    publish<T extends EventBase = EventBase>(event: T): void;
    publishAll<T extends EventBase = EventBase>(event: T[]): void;
    commit(): void;
    uncommit(): void;
    getUncommittedEvents(): EventBase[];
    loadFromHistory(history: EventBase[]): void;
    apply<T extends EventBase = EventBase>(event: T, isFromHistory?: boolean): void;
    protected getEventHandler<T extends EventBase = EventBase>(event: T): Type<IEventHandler> | undefined;
    protected getEventName(event: any): string;
}
export {};
