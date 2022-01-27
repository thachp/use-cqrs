import * as Validator from "class-validator";
import { IEvent } from "./cqrs";
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
export declare const useEvent: <TEvent = IEvent, TError = [Validator.ValidationError]>(name$: string, validatorOptions?: Validator.ValidatorOptions) => [IEventResults<TEvent, TError>, (event: IEvent) => void];
export default useEvent;
