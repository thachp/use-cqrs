import { validate, ValidationError, ValidatorOptions } from "class-validator";
import * as React from "react";

import cqrs from "../../cqrs.config";
import { IEvent } from "../event.interface";

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

    const mountedRef = React.useRef(true);

    // event emitter
    const emit = React.useCallback(async (event: IEvent) => {
        // validate fields before sending the event to the event bus
        const errors = await validate(event, validatorOptions);

        if (!mountedRef.current) return null;

        // if there are errors, set the state to the errors
        if (errors.length > 0) {
            return setEvent({
                error: errors,
                data: null
            });
        }

        try {
            const results = await cqrs.publish(event);
            return setEvent({
                data: results,
                error: null
            });
        } catch (error: any) {
            return setEvent({
                data: null,
                error
            });
        }
    }, []);

    React.useEffect(() => {
        emit(event);
        return () => {
            // unmounting
            mountedRef.current = false;
        };
    }, []);

    return [event, emit];
};

export default useEvent;
