import { equal } from "@wry/equality";
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

    const ref = React.useRef({
        result,
        commandId: 0,
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

        if (!ref.current.result.loading) {
            setResult(
                (ref.current.result = {
                    loading: true,
                    done: false,
                    error: null
                })
            );
        }

        const commandId = ++ref.current.commandId;

        // validate fields before sending the command to the command bus
        const errors = await validate(command, validatorOptions);

        // if there are validation errors, set the state to the errors
        if (errors.length > 0) {
            const result = {
                loading: false,
                done: true,
                error: errors
            };

            if (ref.current.isMounted && !equal(ref.current.result, result)) {
                setResult((ref.current.result = result));
            }
            return;
        }

        if (!(commandId === ref.current.commandId && ref.current.isMounted)) {
            return;
        }

        setResult(
            (ref.current.result = {
                error: null,
                done: false,
                loading: true
            })
        );

        try {
            await commandBus.execute(commandToSend);
            setResult(
                (ref.current.result = {
                    error: null,
                    done: true,
                    loading: false
                })
            );
        } catch (error: any) {
            setResult(
                (ref.current.result = {
                    error,
                    done: false,
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
