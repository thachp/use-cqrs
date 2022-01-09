import { Observable, Subscription } from "rxjs";
import { filter } from "rxjs/operators";
import { Container, Service as Injectable } from "typedi";
import { isFunction } from "util";

import { CommandBus } from "./command-bus";
import { EVENTS_HANDLER_METADATA, SAGA_METADATA } from "./decorators/constants";
import { InvalidSagaException } from "./exceptions";
import { defaultGetEventName } from "./helpers/default-get-event-name";
import { DefaultPubSub } from "./helpers/default-pubsub";
import { IEvent, IEventBus, IEventHandler, IEventPublisher, ISaga } from "./interfaces";
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
    protected moduleRef = Container;

    private _publisher: IEventPublisher<EventBase>;

    constructor(private readonly commandBus: CommandBus) {
        super();
        this.subscriptions = new Map();
        this.getEventName = defaultGetEventName;
        this.useDefaultPublisher();
    }

    get publisher(): IEventPublisher<EventBase> {
        return this._publisher;
    }

    set publisher(_publisher: IEventPublisher<EventBase>) {
        this._publisher = _publisher;
    }

    unsubscribe(name: string) {
        const subscription = this.subscriptions.get(name);
        if (subscription) {
            subscription.unsubscribe();
            this.subscriptions.delete(name);
        }
    }

    unsubscribeAll() {
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

    registerSagas(types: Type<unknown>[] = []) {
        const sagas = types
            .map((target) => {
                const metadata = Reflect.getMetadata(SAGA_METADATA, target) || [];
                const instance = this.moduleRef.get(target);
                if (!instance) {
                    throw new InvalidSagaException();
                }
                return metadata.map((key: string) => instance[key].bind(instance));
            })
            .reduce((a, b) => a.concat(b), []);

        sagas.forEach((saga) => this.registerSaga(saga));
    }

    register(handlers: EventHandlerType<EventBase>[] = []) {
        handlers.forEach((handler) => this.registerHandler(handler));
    }

    ofEventName(name: string) {
        return this.subject$.pipe(filter((event) => this.getEventName(event) === name));
    }

    protected registerHandler(handler: EventHandlerType<EventBase>) {
        const instance = this.moduleRef.get(handler);
        if (!instance) {
            return;
        }
        const eventsNames = this.reflectEventsNames(handler);
        eventsNames.map((event) => this.bind(instance as IEventHandler<EventBase>, event.name));
    }

    protected registerSaga(saga: ISaga<EventBase>) {
        if (!isFunction(saga)) {
            throw new InvalidSagaException();
        }
        const stream$ = saga(this);
        if (!(stream$ instanceof Observable)) {
            throw new InvalidSagaException();
        }

        const subscription = stream$.pipe(filter((e) => !!e)).subscribe((command) => this.commandBus.execute(command));

        this.subscriptions.set(saga.name, subscription);
    }

    private reflectEventsNames(handler: EventHandlerType<EventBase>): FunctionConstructor[] {
        return Reflect.getMetadata(EVENTS_HANDLER_METADATA, handler);
    }

    private useDefaultPublisher() {
        this._publisher = new DefaultPubSub<EventBase>(this.subject$);
    }
}
