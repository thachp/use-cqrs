"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFunction = void 0;
const isFunction = function (obj) {
    return !!(obj && obj.constructor && obj.call && obj.apply);
};
exports.isFunction = isFunction;
exports.default = exports.isFunction;
