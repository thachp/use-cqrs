"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryHandler = void 0;
require("reflect-metadata");
const uuid_1 = require("uuid");
const constants_1 = require("./constants");
/**
 * Decorator that marks a class as a Nest query handler. A query handler
 * handles queries executed by your application code.
 *
 * The decorated class must implement the `IQueryHandler` interface.
 *
 * @param query query *type* to be handled by this handler.
 *
 * @see https://docs.nestjs.com/recipes/cqrs#queries
 */
const QueryHandler = (query) => {
    return (target) => {
        if (!Reflect.hasMetadata(constants_1.QUERY_METADATA, query)) {
            Reflect.defineMetadata(constants_1.QUERY_METADATA, { id: (0, uuid_1.v4)() }, query);
        }
        Reflect.defineMetadata(constants_1.QUERY_HANDLER_METADATA, query, target);
    };
};
exports.QueryHandler = QueryHandler;