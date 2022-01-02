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
exports.CommandBus = void 0;
require("reflect-metadata");
const typedi_1 = require("typedi");
const command_not_found_exception_1 = require("./exceptions/command-not-found.exception");
const default_command_pubsub_1 = require("./helpers/default-command-pubsub");
const observable_bus_1 = require("./utils/observable-bus");
let CommandBus = class CommandBus extends observable_bus_1.ObservableBus {
    constructor() {
        super();
        this.useDefaultPublisher();
    }
    get publisher() {
        return this._publisher;
    }
    set publisher(_publisher) {
        this._publisher = _publisher;
    }
    execute(command) {
        const handler = typedi_1.Container.get(command.constructor.name);
        if (!handler) {
            throw new command_not_found_exception_1.CommandHandlerNotFoundException(command.constructor.name);
        }
        this.subject$.next(command);
        return handler.execute(command);
    }
    useDefaultPublisher() {
        this._publisher = new default_command_pubsub_1.DefaultCommandPubSub(this.subject$);
    }
};
CommandBus = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [])
], CommandBus);
exports.CommandBus = CommandBus;
