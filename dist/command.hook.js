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
const class_validator_1 = require("class-validator");
const React = require("react");
const typedi_1 = require("typedi");
const cqrs_1 = require("./cqrs");
/**
 * The command object is used to send a command to the command bus.
 * @param command
 * @returns CommandResults
 */
const useCommand = (validatorOptions) => {
    // initialize state with loading to true
    const [result, setResult] = React.useState({
        loading: false,
        error: null
    });
    const ref = React.useRef({
        result,
        validatorOptions,
        isMounted: true
    });
    const commandBus = typedi_1.default.get(cqrs_1.CommandBus);
    const execute = React.useCallback((command) => __awaiter(void 0, void 0, void 0, function* () {
        if (!ref.current.result.loading) {
            setResult((ref.current.result = {
                loading: true,
                error: null
            }));
        }
        // validate fields before sending the command to the command bus
        const errors = yield (0, class_validator_1.validate)(command, validatorOptions);
        // if there are errors, set the state to the errors
        if (errors.length > 0) {
            setResult((ref.current.result = {
                loading: false,
                error: errors
            }));
            return;
        }
        // set loading state
        setResult((ref.current.result = {
            error: null,
            loading: true
        }));
        // send the command to the command bus
        try {
            yield commandBus.execute(command);
            // set the state to the command results
            setResult((ref.current.result = {
                error: null,
                loading: false
            }));
        }
        catch (error) {
            // if there is an error, set the state to the error
            setResult((ref.current.result = {
                error,
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
