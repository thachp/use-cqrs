import { validate, ValidatorOptions } from "class-validator";
import Container from "typedi";

import { CommandResults } from "./common/Results";
import { CommandBus, ICommand } from "./cqrs";

/**
 * The command object is used to send a command to the command bus.
 * @param command
 * @returns CommandResults
 */

export const useCommand = <TError>(
    command: ICommand,
    validatorOptions?: ValidatorOptions
): (() => Promise<CommandResults<TError>>) => {
    const commandBus = Container.get(CommandBus);

    // lazy call to the command bus with field validation
    const execute = async () => {
        const errors = await validate(command, validatorOptions);

        if (errors.length > 0) {
            return {
                loading: false,
                errors: errors
            };
        }

        // execute the command
        return await commandBus.execute(command);
    };

    return execute;
};

export default useCommand;
