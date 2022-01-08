import { Subscription } from "rxjs";
import { filter } from "rxjs/operators";

import { Injectable } from "..";
import { CommandBus } from "./command-bus";
import { defaultGetEventName } from "./helpers/default-get-event-name";
import { DefaultPubSub } from "./helpers/default-pubsub";
import { IEvent, IEventBus, IEventHandler, IEventPublisher } from "./interfaces";
import { Type } from "./interfaces/type.interface";
import { ObservableBus } from "./utils";

export type EventHandlerType<EventBase extends IEvent = IEvent> = Type<IEventHandler<EventBase>>;

@Injectable()
export class EventBus<EventBase extends IEvent = IEvent>
    extends ObservableBus<EventBase>
    implements IEventBus<EventBase>
{
    protected getEventName: (event: EventBase) => string;
    protected readonly subscriptions: Map<string, Subscription>;

    private _publisher: IEventPublisher<EventBase>;

    constructor(private readonly commandBus: CommandBus) {
        super();
        this.subscriptions = new Map<string, Subscription>();
        this.getEventName = defaultGetEventName;
        this.useDefaultPublisher();
    }

    get publisher(): IEventPublisher<EventBase> {
        return this._publisher;
    }

    set publisher(_publisher: IEventPublisher<EventBase>) {
        this._publisher = _publisher;
    }

    unsubscribe(name$: string) {
        console.log("unsubscribe", name$);
    }

    unSubscribeAll() {
        this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }

    publish<T extends EventBase>(event: T) {
        return this._publisher.publish(event);
    }

    publishAll<T extends EventBase>(events: T[]) {
        if (this._publisher.publishAll) {
            return this._publisher.publishAll(events);
        }
        return (events || []).map((event) => this._publisher.publish(event));
    }

    bind(handler: IEventHandler<EventBase>, name: string) {
        const stream$ = name ? this.ofEventName(name) : this.subject$;
        const subscription = stream$.subscribe((event) => handler.handle(event));
        this.subscriptions.set(name, subscription);
    }

    public ofEventName(name: string) {
        return this.subject$.pipe(filter((event) => this.getEventName(event) === name));
    }

    private useDefaultPublisher() {
        this._publisher = new DefaultPubSub<EventBase>(this.subject$);
    }
}
