import { validate, ValidationError, ValidatorOptions } from "class-validator";
import * as React from "react";
import { Container } from "typedi";

import { EventBus, IEvent } from "./cqrs";

export interface IEventResults<TData = any, TError = any> {
    error: TError;
    data: TData;
}

/**
 *
 * @param name - The name of the event.
 * @param transformer  - Optional, transform the message into IEvent type class.
 */
export const useEvent = <TEvent = IEvent, TError = [ValidationError]>(
    name$: string,
    validatorOptions?: ValidatorOptions
): [IEventResults<TEvent, TError>, (event: IEvent) => void] => {
    // the event bus
    const [event, setEvent] = React.useState<IEventResults>({
        error: null,
        data: null
    });

    const eventBus = Container.get(EventBus);

    // emit the event
    const emit = React.useCallback(async (event: IEvent) => {
        // validate fields before sending the command to the command bus
        const errors = await validate(event, validatorOptions);

        // if there are errors, set the state to the errors
        if (errors.length > 0) {
            return setEvent({
                error: errors,
                data: null
            });
        }

        try {
            eventBus.publish(event);
        } catch (error: any) {
            console.log("got error", error);
            setEvent({
                error,
                data: null
            });
        }
    }, []);

    React.useEffect(() => {
        // @TODO: event coming from source adapter, should send it to the event bus

        // event coming from the event bus should be send to the state
        // eventBus.ofEventName(name$).subscribe((event) => {
        //     console.log("got event", event);

        //     setEvent({
        //         data: event,
        //         error: null
        //     });
        // });

        return () => {
            // unsubscribe from the event bus
            //eventBus.unsubscribe(name$);
        };
    }, []);

    return [event, emit];
};

export default useEvent;
