import { validate, ValidationError, ValidatorOptions } from "class-validator";
import * as React from "react";
import { Container as IoC } from "typedi";

import { EventBus, IEvent } from "./cqrs";

export interface IEventResults<TData = any, TError = any> {
    error: TError;
    data: TData;
}

/**
 * Signal an event has happened. React to the event.
 * One event is handled by one event handler.
 * Events should not return data.
 * @param name$  The name of the event.
 * @param validatorOptions Optional validator options from class-validator.
 * @returns
 */
export const useEvent = <TEvent = IEvent, TError = [ValidationError]>(
    name$: string,
    validatorOptions?: ValidatorOptions
): [IEventResults<TEvent, TError>, (event: IEvent) => void] => {
    const [event, setEvent] = React.useState<IEventResults>({
        error: null,
        data: null
    });

    const eventBus = IoC.get(EventBus);

    // event emitter
    const emit = React.useCallback(async (event: IEvent) => {
        // validate fields before sending the event to the event bus
        const errors = await validate(event, validatorOptions);

        // if there are errors, set the state to the errors
        if (errors.length > 0) {
            return setEvent({
                error: errors,
                data: null
            });
        }

        // emit the event
        eventBus.publish(event);
    }, []);

    React.useEffect(() => {
        // subscribe to the event by event name and update the state
        eventBus.ofEventName(name$).subscribe({
            next: (event) =>
                setEvent({
                    data: event,
                    error: null
                })
        });

        return () => {
            // unsubscribe from the event when the component unmounts
            // this is important to avoid memory leaks
            eventBus.unsubscribe(name$);
        };
    }, []);

    return [event, emit];
};

export default useEvent;
