"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useEvent = void 0;
const typedi_1 = require("typedi");
const cqrs_1 = require("./cqrs");
/**
 *
 * @param name
 * @param callback
 */
const useEvent = (event, callback) => {
    // check if the event is already registered
    const eventBus = typedi_1.default.get(cqrs_1.EventBus);
    eventBus.subscribe({
        next: (e) => {
            console.log("observinng!", event);
        }
    });
    return callback(event);
};
exports.useEvent = useEvent;
exports.default = exports.useEvent;
