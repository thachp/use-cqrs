import { validate, ValidatorOptions } from "class-validator";
import { useState } from "react";
import Container from "typedi";

import { CommandBus, ICommand } from "./cqrs";

/**
 * The command object is used to send a command to the command bus.
 * @param command
 * @returns CommandResults
 */

const useCommand = <T>(command: ICommand, validatorOptions?: ValidatorOptions): Function => {
    const commandBus = Container.get(CommandBus);

    // lazy call the success and error handlers
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
