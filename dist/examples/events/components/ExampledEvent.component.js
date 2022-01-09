"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExampledEventComponent = void 0;
const React = require("react");
const of_name_1 = require("../../../cqrs/operators/of-name");
const event_hook_1 = require("../../../event.hook");
const exampled_event_1 = require("../exampled.event");
const ExampledEventComponent = () => {
    // setup an emit hook
    const [{ data, error }, emit] = (0, event_hook_1.useEvent)((0, of_name_1.nameOf)(exampled_event_1.ExampledEvent));
    return (React.createElement("div", null,
        React.createElement("h1", null, exports.ExampledEventComponent.name),
        React.createElement("button", { "data-testid": "emit", onClick: () => emit(new exampled_event_1.ExampledEvent("Hello World!")) }, "Emit"),
        React.createElement("p", { "data-testid": "event" }, (data === null || data === void 0 ? void 0 : data.hello) || "No event yet")));
};
exports.ExampledEventComponent = ExampledEventComponent;
