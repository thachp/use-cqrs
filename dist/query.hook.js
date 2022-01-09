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
const class_validator_1 = require("class-validator");
const React = require("react");
const typedi_1 = require("typedi");
const cqrs_1 = require("./cqrs");
/**
 * The Query object is used to send a query to the query bus.
 * @param query
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
        const errors = yield (0, class_validator_1.validate)(query, validatorOptions);
        if (errors.length > 0) {
            return setResult({
                loading: false,
                data: null,
                error: errors
            });
        }
        try {
            // process the query
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
    // for the intial render, wait for the query to be processed
    React.useEffect(() => {
        process(query);
    }, []);
    return [result, process];
};
exports.useQuery = useQuery;
exports.default = exports.useQuery;
