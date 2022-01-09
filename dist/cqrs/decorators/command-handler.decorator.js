"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandHandler = void 0;
require("reflect-metadata");
const uuid_1 = require("uuid");
const constants_1 = require("./constants");
/**
 * Decorator that marks a class as a Nest command handler. A command handler
 * handles commands (actions) executed by your application code.
 *
 * The decorated class must implement the `ICommandHandler` interface.
 *
 * @param command command *type* to be handled by this handler.
 *
 * @see https://docs.nestjs.com/recipes/cqrs#commands
 */
const CommandHandler = (command) => {
    return (target) => {
        if (!Reflect.hasMetadata(constants_1.COMMAND_METADATA, command)) {
            Reflect.defineMetadata(constants_1.COMMAND_METADATA, { id: (0, uuid_1.v4)() }, command);
        }
        Reflect.defineMetadata(constants_1.COMMAND_HANDLER_METADATA, command, target);
    };
};
exports.CommandHandler = CommandHandler;