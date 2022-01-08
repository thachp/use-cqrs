import * as React from "react";
import { Container } from "typedi";

import { EventBus, IEvent } from "./cqrs";

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

    // @TODO: event coming from source adapter, should send it to the event bus

    const emit = React.useCallback((event: IEvent) => {
        eventBus.publish(event);
    }, []);

    React.useEffect(() => {
        // event coming from the event bus should be send to the state
        eventBus.ofEventName(name$).subscribe((event) => {
            setEvent(transformer ? transformer(event) : (event as any));
        });

        return () => {
            // unsubscribe from the event bus
            eventBus.unsubscribe(name$);
        };
    }, [event]);

    return [event, emit];
};

export default useEvent;
