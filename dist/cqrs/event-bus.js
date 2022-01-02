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
exports.EventBus = void 0;
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const typedi_1 = require("typedi");
const command_bus_1 = require("./command-bus");
const constants_1 = require("./decorators/constants");
const exceptions_1 = require("./exceptions");
const default_get_event_name_1 = require("./helpers/default-get-event-name");
const default_pubsub_1 = require("./helpers/default-pubsub");
const utils_1 = require("./utils");
let EventBus = class EventBus extends utils_1.ObservableBus {
    constructor(commandBus) {
        super();
        this.commandBus = commandBus;
        this.subscriptions = [];
        this.getEventName = default_get_event_name_1.defaultGetEventName;
        this.useDefaultPublisher();
    }
    get publisher() {
        return this._publisher;
    }
    set publisher(_publisher) {
        this._publisher = _publisher;
    }
    /**
     * @TODO -- code smell, need to destroy all subscriptions
     */
    onModuleDestroy() {
        this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }
    publish(event) {
        return this._publisher.publish(event);
    }
    publishAll(events) {
        if (this._publisher.publishAll) {
            return this._publisher.publishAll(events);
        }
        return (events || []).map((event) => this._publisher.publish(event));
    }
    bind(handler, name) {
        const stream$ = name ? this.ofEventName(name) : this.subject$;
        const subscription = stream$.subscribe((event) => handler.handle(event));
        this.subscriptions.push(subscription);
    }
    registerSagas(types = []) {
        const sagas = types
            .map((target) => {
            const metadata = Reflect.getMetadata(constants_1.SAGA_METADATA, target) || [];
            const instance = typedi_1.Container.get(target);
            if (!instance) {
                throw new exceptions_1.InvalidSagaException();
            }
            return metadata.map((key) => instance[key].bind(instance));
        })
            .reduce((a, b) => a.concat(b), []);
        sagas.forEach((saga) => this.registerSaga(saga));
    }
    register(handlers = []) {
        handlers.forEach((handler) => this.registerHandler(handler));
    }
    registerHandler(handler) {
        const instance = typedi_1.Container.get(handler);
        if (!instance) {
            return;
        }
        const eventsNames = this.reflectEventsNames(handler);
        eventsNames.map((event) => this.bind(instance, event.name));
    }
    ofEventName(name) {
        return this.subject$.pipe((0, operators_1.filter)((event) => this.getEventName(event) === name));
    }
    registerSaga(saga) {
        if (!(0, utils_1.isFunction)(saga)) {
            throw new exceptions_1.InvalidSagaException();
        }
        const stream$ = saga(this);
        if (!(stream$ instanceof rxjs_1.Observable)) {
            throw new exceptions_1.InvalidSagaException();
        }
        const subscription = stream$.pipe((0, operators_1.filter)((e) => !!e)).subscribe((command) => this.commandBus.execute(command));
        this.subscriptions.push(subscription);
    }
    reflectEventsNames(handler) {
        return Reflect.getMetadata(constants_1.EVENTS_HANDLER_METADATA, handler);
    }
    useDefaultPublisher() {
        this._publisher = new default_pubsub_1.DefaultPubSub(this.subject$);
    }
};
EventBus = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [command_bus_1.CommandBus])
], EventBus);
exports.EventBus = EventBus;
