"use strict";
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
exports.useEvent = void 0;
const class_validator_1 = require("class-validator");
const React = require("react");
const typedi_1 = require("typedi");
const cqrs_1 = require("./cqrs");
/**
 * Signal an event has happened. React to the event.
 * One event is handled by one event handler.
 * Events should not return data.
 * @param name$  The name of the event.
 * @param validatorOptions Optional validator options from class-validator.
 * @returns
 */
const useEvent = (name$, validatorOptions) => {
    const [event, setEvent] = React.useState({
        error: null,
        data: null
    });
    const eventBus = typedi_1.Container.get(cqrs_1.EventBus);
    // event emitter
    const emit = React.useCallback((event) => __awaiter(void 0, void 0, void 0, function* () {
        // validate fields before sending the event to the event bus
        const errors = yield (0, class_validator_1.validate)(event, validatorOptions);
        // if there are errors, set the state to the errors
        if (errors.length > 0) {
            return setEvent({
                error: errors,
                data: null
            });
        }
        // emit the event
        eventBus.publish(event);
    }), []);
    React.useEffect(() => {
        // subscribe to the event by event name and update the state
        eventBus.ofEventName(name$).subscribe({
            next: (event) => setEvent({
                data: event,
                error: null
            })
        });
        return () => {
            // unsubscribe from the event when the component unmounts
            // this is important to avoid memory leaks
            eventBus.unsubscribe(name$);
        };
    }, []);
    return [event, emit];
};
exports.useEvent = useEvent;
exports.default = exports.useEvent;
