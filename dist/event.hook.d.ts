import { IEvent } from "./cqrs";
/**
 *
 * @param name
 * @param callback
 */
export declare const useEvent: (event: IEvent, callback: (event: IEvent) => void) => void;
export default useEvent;
