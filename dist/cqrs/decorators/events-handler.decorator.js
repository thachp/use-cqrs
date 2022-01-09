"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsHandler = void 0;
require("reflect-metadata");
const constants_1 = require("./constants");
/**
 * Decorator that marks a class as a Nest event handler. An event handler
 * handles events executed by your application code.
 *
 * The decorated class must implement the `IEventHandler` interface.
 *
 * @param events one or more event *types* to be handled by this handler.
 *
 * @see https://docs.nestjs.com/recipes/cqrs#events
 */
const EventsHandler = (...events) => {
    return (target) => {
        Reflect.defineMetadata(constants_1.EVENTS_HANDLER_METADATA, events, target);
    };
};
exports.EventsHandler = EventsHandler;
