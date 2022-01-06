import * as React from "react";
import Container from "typedi";

import { Injectable } from ".";
import { EventBus, IEvent } from "./cqrs";

export interface IDataProvider<THttpAdapter, TWebSocketAdapter = any, TEventSourceAdapter = any> {
    http: THttpAdapter;
    websocket?: TWebSocketAdapter;
    eventSource?: TEventSourceAdapter;
}

export interface IEventSourceAdapter {
    onOpen(): void;
    onMessage<TEvent = IEvent>(message: TEvent): void;
    onError(error: Error): void;
    onClose(): void;
}

@Injectable()
export class EventSourceAdapter implements IEventSourceAdapter {
    private _instance: EventSourceAdapter = null;

    onOpen(): void {
        throw new Error("Method not implemented.");
    }
    onMessage<TEvent = any>(message: TEvent): void {
        throw new Error("Method not implemented.");
    }
    onClose(): void {
        throw new Error("Method not implemented.");
    }
    onError(error: Error): void {
        throw new Error("Method not implemented.");
    }
    //
}

/**
 *
 * @param name - The name of the event.
 * @param transformer  - Optional, transform the message into IEvent type class.
 */
export const useEvent = <TEvent = IEvent>(
    name$: string,
    transformer?: (message: any) => TEvent
): [TEvent, (event: IEvent) => void] => {
    // the event bus
    const [event, setEvent] = React.useState<TEvent>(null);

    const eventBus = Container.get(EventBus);
    const eventSource = Container.get(EventSourceAdapter);

    if (eventSource) {
        // event coming from source adapter, should send it to the event bus
        eventSource.onMessage = <TEvent>(message: TEvent) => {
            // transform the message into IEvent class
            const event = transformer ? transformer(message) : message;
            // then send it to the event bus
            eventBus.publish(event);
        };
    }

    const emit = React.useCallback((event: IEvent) => {
        eventBus.publish(event);
    }, []);

    React.useEffect(() => {
        // event coming from the event bus should be send to the state
        eventBus.subject$.subscribe({
            next: (v) => {
                // if the event is the one we are looking for
                if (v.type === name$) {
                    setEvent(v as any);
                }
            }
        });

        return () => {
            // unsubscribe from the event bus
            eventBus.subject$.unsubscribe();
        };
    }, [event]);

    return [event, emit];
};

export default useEvent;
