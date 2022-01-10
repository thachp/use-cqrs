import { ValidationError, ValidatorOptions } from "class-validator";
import { ICommand } from "./cqrs";
export interface ICommandResults<TError> {
    loading: boolean;
    error: TError | Array<ValidationError>;
}
/**
 * Signal the user's intentions. Tell the system to do something.
 * One command is handled by one command handler.
 * Commands change the state of the application, but should not return data with the exception of errors.
 * @param initialCommand  Optional The command to be sent to the command bus.
 * @param validatorOptions Optional validator options from class-validator.
 * @returns
 */
export declare const useCommand: <TError = [ValidationError]>(initialCommand?: ICommand, validatorOptions?: ValidatorOptions) => [ICommandResults<TError>, (command?: ICommand) => Promise<void>];
export default useCommand;
