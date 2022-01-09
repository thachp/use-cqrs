"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidEventsHandlerException = void 0;
class InvalidEventsHandlerException extends Error {
    constructor() {
        super(`Invalid event handler exception (missing @Injectable() decorator?)`);
    }
}
exports.InvalidEventsHandlerException = InvalidEventsHandlerException;
