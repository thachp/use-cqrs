import Container from "typedi";

import { EventBus, IEvent } from "./cqrs";

/**
 *
 * @param name
 * @param callback
 */
export const useEvent = (event: IEvent, callback: (event: IEvent) => void) => {
    // check if the event is already registered
    const eventBus = Container.get(EventBus);
    eventBus.subscribe({
        next: (e: IEvent) => {
            console.log("observinng!", event);
        }
    });

    return callback(event);
};

export default useEvent;
