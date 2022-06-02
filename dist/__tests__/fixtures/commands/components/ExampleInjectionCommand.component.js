"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExampleWithInjectionComponent = void 0;
const React = require("react");
const __1 = require("../../../..");
const examplewithinjection_command_1 = require("../examplewithinjection.command");
const ExampleWithInjectionComponent = () => {
    // Command hook
    const [{ loading, error }, command] = (0, __1.useCommand)();
    if (error) {
        return (React.createElement("div", { "data-testid": "errors" },
            React.createElement("div", null, error.message)));
    }
    if (loading) {
        return React.createElement("div", null, "Loading...");
    }
    return (React.createElement("button", { "data-testid": "more", onClick: () => command(new examplewithinjection_command_1.ExampleWithInjectionCommand("Hello", "World")) }, "More"));
};
exports.ExampleWithInjectionComponent = ExampleWithInjectionComponent;
