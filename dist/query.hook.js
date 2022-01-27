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
require("reflect-metadata");
const Validator = require("class-validator");
const React = require("react");
const typedi_1 = require("typedi");
const cqrs_1 = require("./cqrs");
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
    const queryBus = typedi_1.Container.get(cqrs_1.QueryBus);
    // for lazy loading
    const process = React.useCallback((query) => __awaiter(void 0, void 0, void 0, function* () {
        const errors = yield Validator.validate(query, validatorOptions);
        if (errors.length > 0) {
            return setResult({
                loading: false,
                data: null,
                error: errors
            });
        }
        try {
            const results = yield queryBus.process(query);
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
    }, []);
    return [result, process];
};
exports.useQuery = useQuery;
exports.default = exports.useQuery;
