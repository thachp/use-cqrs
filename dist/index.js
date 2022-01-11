"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Injectable = exports.IoC = void 0;
__exportStar(require("./cqrs/operators/of-name"), exports);
__exportStar(require("./command.hook"), exports);
__exportStar(require("./event.hook"), exports);
__exportStar(require("./query.hook"), exports);
__exportStar(require("./cqrs"), exports);
var typedi_1 = require("typedi");
Object.defineProperty(exports, "IoC", { enumerable: true, get: function () { return typedi_1.Container; } });
Object.defineProperty(exports, "Injectable", { enumerable: true, get: function () { return typedi_1.Service; } });
