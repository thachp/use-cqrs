"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useQuery = void 0;
const typedi_1 = require("typedi");
const cqrs_1 = require("./cqrs");
/**
 * The Query object is used to send a query to the query bus.
 * @param query
 */
const useQuery = (query) => {
    const queryBus = typedi_1.default.get(cqrs_1.QueryBus);
    const results = queryBus.process(query);
};
exports.useQuery = useQuery;
exports.default = exports.useQuery;
