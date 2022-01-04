import { validate, ValidationError, ValidatorOptions } from "class-validator";
import * as React from "react";
import Container from "typedi";

import { CommandBus, ICommand } from "./cqrs";

export interface ICommandResults<TError> {
    loading: boolean;
    error: TError | Array<ValidationError>;
}

/**
 * The command object is used to send a command to the command bus.
 * @param command
 * @returns CommandResults
 */

export const useCommand = <TError = [ValidationError]>(
    initialCommand: ICommand,
    validatorOptions?: ValidatorOptions
): [ICommandResults<TError>, (command?: ICommand) => Promise<void>] => {
    // initialize state with loading to true
    const [result, setResult] = React.useState<ICommandResults<TError>>({
        loading: false,
        error: null
    });

    const ref = React.useRef({
        result,
        validatorOptions,
        isMounted: true
    });

    const commandBus = Container.get(CommandBus);

    const execute = React.useCallback(async (command?: ICommand) => {
        const commandToExecute = command || initialCommand;

        if (!ref.current.result.loading) {
            setResult(
                (ref.current.result = {
                    loading: true,
                    error: null
                })
            );
        }

        // validate fields before sending the command to the command bus
        const errors = await validate(commandToExecute, validatorOptions);

        // if there are errors, set the state to the errors
        if (errors.length > 0) {
            setResult(
                (ref.current.result = {
                    loading: false,
                    error: errors
                })
            );
            return;
        }

        // set loading state
        setResult(
            (ref.current.result = {
                error: null,
                loading: true
            })
        );

        // send the command to the command bus
        try {
            await commandBus.execute(commandToExecute);

            // set the state to the command results
            setResult(
                (ref.current.result = {
                    error: null,
                    loading: false
                })
            );
        } catch (error: any) {
            // if there is an error, set the state to the error
            setResult(
                (ref.current.result = {
                    error,
                    loading: false
                })
            );
        }
    }, []);

    React.useEffect(
        () => () => {
            ref.current.isMounted = false;
        },
        []
    );

    return [result, execute];
};

export default useCommand;
