import { Observable, Subscription } from "rxjs";
import { CommandBus } from "./command-bus";
import { IEvent, IEventBus, IEventHandler, IEventPublisher, ISaga } from "./interfaces";
import { Type } from "./interfaces/type.interface";
import { ObservableBus } from "./utils";
export declare type EventHandlerType<EventBase extends IEvent = IEvent> = Type<IEventHandler<EventBase>>;
export declare class EventBus<EventBase extends IEvent = IEvent> extends ObservableBus<EventBase> implements IEventBus<EventBase> {
    private readonly commandBus;
    protected getEventName: (event: EventBase) => string;
    protected readonly subscriptions: Subscription[];
    private _publisher;
    constructor(commandBus: CommandBus);
    get publisher(): IEventPublisher<EventBase>;
    set publisher(_publisher: IEventPublisher<EventBase>);
    /**
     * @TODO -- code smell, need to destroy all subscriptions
     */
    onModuleDestroy(): void;
    publish<T extends EventBase>(event: T): any;
    publishAll<T extends EventBase>(events: T[]): any;
    bind(handler: IEventHandler<EventBase>, name: string): void;
    registerSagas(types?: Type<unknown>[]): void;
    register(handlers?: EventHandlerType<EventBase>[]): void;
    protected registerHandler(handler: EventHandlerType<EventBase>): void;
    protected ofEventName(name: string): Observable<EventBase>;
    protected registerSaga(saga: ISaga<EventBase>): void;
    private reflectEventsNames;
    private useDefaultPublisher;
}
