import { ValidatorOptions } from "class-validator";
import { ICommand } from "./cqrs";
/**
 * The command object is used to send a command to the command bus.
 * @param command
 * @returns CommandResults
 */
declare const useCommand: <T>(command: ICommand, validatorOptions?: ValidatorOptions) => Function;
export default useCommand;
