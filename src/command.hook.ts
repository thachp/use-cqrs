import { validate, ValidationError, ValidatorOptions } from "class-validator";
import * as React from "react";
import { Container as IoC } from "typedi";

import { CommandBus, ICommand } from "./cqrs";

export interface ICommandResults<TError> {
    loading: boolean;
    done: boolean;
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
export const useCommand = <TError = [ValidationError]>(
    initialCommand?: ICommand,
    validatorOptions?: ValidatorOptions
): [ICommandResults<TError>, (command?: ICommand) => Promise<void>] => {
    // initialize state with loading to true
    const [result, setResult] = React.useState<ICommandResults<TError>>({
        loading: false,
        done: false,
        error: null
    });

    const mountedRef = React.useRef({
        result,
        validatorOptions,
        isMounted: true
    });

    const commandBus = IoC.get(CommandBus);

    /**
     * Send the command to the command bus.
     */
    const execute = React.useCallback(async (command?: ICommand) => {
        const commandToSend = command || initialCommand;

        if (!commandToSend) {
            throw new Error("No command execute.");
        }

        if (!mountedRef.current.result.loading) {
            setResult(
                (mountedRef.current.result = {
                    loading: true,
                    done: false,
                    error: null
                })
            );
        }

        // validate fields before sending the command to the command bus
        const errors = await validate(command, validatorOptions);

        // if there are validation errors, set the state to the errors
        if (errors.length > 0) {
            setResult(
                (mountedRef.current.result = {
                    loading: false,
                    done: true,
                    error: errors
                })
            );
            return;
        }

        setResult(
            (mountedRef.current.result = {
                error: null,
                done: false,
                loading: true
            })
        );

        try {
            await commandBus.execute(commandToSend);
            setResult(
                (mountedRef.current.result = {
                    error: null,
                    done: true,
                    loading: false
                })
            );
        } catch (error: any) {
            setResult(
                (mountedRef.current.result = {
                    error,
                    done: false,
                    loading: false
                })
            );
        }
    }, []);

    React.useEffect(
        () => () => {
            (mountedRef as any).current = false;
        },
        []
    );

    return [result, execute];
};

export default useCommand;
