import { ValidationError, ValidatorOptions } from "class-validator";
import { ICommand } from "./cqrs";
export interface ICommandResults<TError> {
    loading: boolean;
    error: TError | Array<ValidationError>;
}
/**
 * The command object is used to send a command to the command bus.
 * @param command
 * @returns CommandResults
 */
export declare const useCommand: <TError = [ValidationError]>(validatorOptions?: ValidatorOptions) => [ICommandResults<TError>, (command?: ICommand) => Promise<void>];
export default useCommand;
