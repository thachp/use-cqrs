"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExampledExceptionEventComponent = void 0;
const React = require("react");
const of_name_1 = require("../../../cqrs/operators/of-name");
const event_hook_1 = require("../../../event.hook");
const exampledexception_event_1 = require("../exampledexception.event");
const ExampledExceptionEventComponent = () => {
    // setup an emit hook
    const [{ data, error }, emit] = (0, event_hook_1.useEvent)((0, of_name_1.nameOf)(exampledexception_event_1.ExampledExceptionEvent));
    if (error) {
        return React.createElement("div", { "data-testid": "error" }, "Errors...");
    }
    return (React.createElement("div", null,
        React.createElement("h1", null, exports.ExampledExceptionEventComponent.name),
        React.createElement("button", { "data-testid": "emit", onClick: () => emit(new exampledexception_event_1.ExampledExceptionEvent("Hello World!")) }, "Emit"),
        React.createElement("p", { "data-testid": "event" }, (data === null || data === void 0 ? void 0 : data.hello) || "No event yet")));
};
exports.ExampledExceptionEventComponent = ExampledExceptionEventComponent;
