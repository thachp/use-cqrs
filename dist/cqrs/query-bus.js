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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryBus = void 0;
require("reflect-metadata");
const typedi_1 = require("typedi");
const exceptions_1 = require("./exceptions");
const default_query_pubsub_1 = require("./helpers/default-query-pubsub");
const observable_bus_1 = require("./utils/observable-bus");
let QueryBus = class QueryBus extends observable_bus_1.ObservableBus {
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
    process(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const handler = typedi_1.default.get(query.constructor.name);
            if (!handler) {
                throw new exceptions_1.QueryHandlerNotFoundException(query.constructor.name);
            }
            this.subject$.next(query);
            const result = yield handler.process(query);
            return result;
        });
    }
    useDefaultPublisher() {
        this._publisher = new default_query_pubsub_1.DefaultQueryPubSub(this.subject$);
    }
};
QueryBus = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [])
], QueryBus);
exports.QueryBus = QueryBus;
