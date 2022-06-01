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
exports.useQuery = void 0;
const Validator = require("class-validator");
const React = require("react");
const cqrs_config_1 = require("../../cqrs.config");
/**
 * A query ask for something, signal a question.
 * The Query object is loaded on to the query bus.
 * One query is handled by one query handler.
 * Queries return data and should not change the state of the application.
 * @param query
 * @param validatorOptions Optional validator options from class-validator.
 * @returns void
 */
const useQuery = (query, validatorOptions) => {
    const [result, setResult] = React.useState({
        loading: true,
        data: null,
        error: null
    });
    const mountedRef = React.useRef(true);
    // for lazy loading
    const process = React.useCallback((query) => __awaiter(void 0, void 0, void 0, function* () {
        const errors = yield Validator.validate(query, validatorOptions);
        if (!mountedRef.current)
            return null;
        if (errors.length > 0) {
            return setResult({
                loading: false,
                data: null,
                error: errors
            });
        }
        try {
            const results = yield cqrs_config_1.cqrs.send(query);
            return setResult({
                loading: false,
                data: results,
                error: null
            });
        }
        catch (error) {
            return setResult({
                loading: false,
                data: null,
                error
            });
        }
    }), []);
    // call process one time on the first render
    React.useEffect(() => {
        process(query);
        return () => {
            // unmounting
            mountedRef.current = false;
        };
    }, []);
    return [result, process];
};
exports.useQuery = useQuery;
exports.default = exports.useQuery;
