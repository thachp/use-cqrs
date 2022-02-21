"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCqrs = exports.CqrsModule = void 0;
const class_validator_1 = require("class-validator");
const typedi_1 = require("typedi");
const command_bus_1 = require("./cqrs/command-bus");
const event_bus_1 = require("./cqrs/event-bus");
const query_bus_1 = require("./cqrs/query-bus");
let CqrsModule = class CqrsModule {
    constructor(eventsBus, commandsBus, queryBus) {
        this.eventsBus = eventsBus;
        this.commandsBus = commandsBus;
        this.queryBus = queryBus;
    }
    initialize(options = {}) {
        const { events = [], queries = [], sagas = [], commands = [] } = options;
        this.eventsBus.register(events);
        this.commandsBus.register(commands);
        this.queryBus.register(queries);
        this.eventsBus.registerSagas(sagas);
    }
};
CqrsModule = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [event_bus_1.EventBus,
        command_bus_1.CommandBus,
        query_bus_1.QueryBus])
], CqrsModule);
exports.CqrsModule = CqrsModule;
// inject dependencies into custom validator constraint classes
(0, class_validator_1.useContainer)(typedi_1.Container, { fallbackOnErrors: true });
exports.useCqrs = typedi_1.Container.get(CqrsModule);
exports.default = exports.useCqrs;
