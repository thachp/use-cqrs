"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCommand = void 0;
const equality_1 = require("@wry/equality");
const class_validator_1 = require("class-validator");
const React = require("react");
const typedi_1 = require("typedi");
const cqrs_1 = require("./cqrs");
/**
 * Signal the user's intentions. Tell the system to do something.
 * One command is handled by one command handler.
 * Commands change the state of the application, but should not return data with the exception of errors.
 * @param initialCommand  Optional The command to be sent to the command bus.
 * @param validatorOptions Optional validator options from class-validator.
 * @returns
 */
const useCommand = (initialCommand, validatorOptions) => {
    // initialize state with loading to true
    const [result, setResult] = React.useState({
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
    const commandBus = typedi_1.Container.get(cqrs_1.CommandBus);
    /**
     * Send the command to the command bus.
     */
    const execute = React.useCallback((command) => __awaiter(void 0, void 0, void 0, function* () {
        const commandToSend = command || initialCommand;
        if (!commandToSend) {
            throw new Error("No command execute.");
        }
        if (!ref.current.result.loading) {
            setResult((ref.current.result = {
                loading: true,
                done: false,
                error: null
            }));
        }
        const commandId = ++ref.current.commandId;
        // validate fields before sending the command to the command bus
        const errors = yield (0, class_validator_1.validate)(command, validatorOptions);
        // if there are validation errors, set the state to the errors
        if (errors.length > 0) {
            const result = {
                loading: false,
                done: true,
                error: errors
            };
            if (ref.current.isMounted && !(0, equality_1.equal)(ref.current.result, result)) {
                setResult((ref.current.result = result));
            }
            return;
        }
        if (!(commandId === ref.current.commandId && ref.current.isMounted)) {
            return;
        }
        setResult((ref.current.result = {
            error: null,
            done: false,
            loading: true
        }));
        try {
            yield commandBus.execute(commandToSend);
            setResult((ref.current.result = {
                error: null,
                done: true,
                loading: false
            }));
        }
        catch (error) {
            setResult((ref.current.result = {
                error,
                done: false,
                loading: false
            }));
        }
    }), []);
    React.useEffect(() => () => {
        ref.current.isMounted = false;
    }, []);
    return [result, execute];
};
exports.useCommand = useCommand;
exports.default = exports.useCommand;
