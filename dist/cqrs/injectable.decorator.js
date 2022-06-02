"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Injectable = void 0;
const mediatr_ts_1 = require("mediatr-ts");
const typedi_1 = require("typedi");
function Injectable(token, serviceOptions) {
    const serviceFn = (0, typedi_1.Service)(serviceOptions);
    let requestHandlerFn = token ? (0, mediatr_ts_1.RequestHandler)(token) : undefined;
    return function (target) {
        serviceFn(target);
        if (requestHandlerFn) {
            requestHandlerFn(target);
        }
    };
}
exports.Injectable = Injectable;
