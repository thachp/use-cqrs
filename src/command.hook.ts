import { validate, ValidationError, ValidatorOptions } from "class-validator";
import * as React from "react";
import Container from "typedi";

import { CommandBus, ICommand } from "./cqrs";

export interface ICommandResults<TError> {
    loading: boolean;
    errors: TError | Array<ValidationError>;
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
    const [results, setResults] = React.useState<ICommandResults<TError>>({
        loading: false,
        errors: []
    });

    const ref = React.useRef({
        results,
        validatorOptions,
        isMounted: true
    });

    const commandBus = Container.get(CommandBus);

    const execute = React.useCallback(async (command?: ICommand) => {
        const commandToExecute = command || initialCommand;

        if (!ref.current.results.loading) {
            setResults(
                (ref.current.results = {
                    loading: true,
                    errors: []
                })
            );
        }

        // validate fields before sending the command to the command bus
        const errors = await validate(commandToExecute, validatorOptions);

        // if there are errors, set the state to the errors
        if (errors.length > 0) {
            setResults(
                (ref.current.results = {
                    loading: false,
                    errors
                })
            );
            return;
        }

        // set loading state
        setResults(
            (ref.current.results = {
                errors: [],
                loading: true
            })
        );

        // send the command to the command bus
        const results = await commandBus.execute(commandToExecute);

        // set the state to the results
        setResults(results);
    }, []);

    React.useEffect(
        () => () => {
            ref.current.isMounted = false;
        },
        []
    );

    return [results, execute];
};

export default useCommand;
