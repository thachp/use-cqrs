"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cqrs = void 0;
const mediatr_ts_1 = require("mediatr-ts");
const typedi_resolver_1 = require("./typedi.resolver");
mediatr_ts_1.mediatorSettings.resolver = new typedi_resolver_1.default();
exports.cqrs = new mediatr_ts_1.Mediator();
exports.default = exports.cqrs;
