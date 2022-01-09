import { ValidationError, ValidatorOptions } from "class-validator";
import { IEvent } from "./cqrs";
export interface IEventResults<TData = any, TError = any> {
    error: TError;
    data: TData;
}
/**
 *
 * @param name - The name of the event.
 * @param transformer  - Optional, transform the message into IEvent type class.
 */
export declare const useEvent: <TEvent = IEvent, TError = [ValidationError]>(name$: string, validatorOptions?: ValidatorOptions) => [IEventResults<TEvent, TError>, (event: IEvent) => void];
export default useEvent;
