import * as Validator from "class-validator";
import { ICommand } from "./cqrs";
export interface ICommandResults<TError> {
    loading: boolean;
    done: boolean;
    error: TError | Array<Validator.ValidationError>;
}
/**
 * Signal the user's intentions. Tell the system to do something.
 * One command is handled by one command handler.
 * Commands change the state of the application, but should not return data with the exception of errors.
 * @param initialCommand  Optional The command to be sent to the command bus.
 * @param validatorOptions Optional validator options from class-validator.
 * @returns
 */
export declare const useCommand: <TError = [Validator.ValidationError]>(initialCommand?: ICommand, validatorOptions?: Validator.ValidatorOptions) => [ICommandResults<TError>, (command?: ICommand) => Promise<void>];
export default useCommand;
