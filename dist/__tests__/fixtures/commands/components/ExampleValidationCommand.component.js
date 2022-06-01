"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExampleValidationCommandComponent = void 0;
const React = require("react");
const __1 = require("../../../..");
const examplewithvalidation_command_1 = require("../examplewithvalidation.command");
const ExampleValidationCommandComponent = () => {
    // setup command hook
    const [{ loading, error }, command] = (0, __1.useCommand)();
    // if errors, display them
    if (error) {
        return (React.createElement("div", { "data-testid": "errors" }, error.map((e) => (React.createElement("div", { key: e.property }, e.property)))));
    }
    // if loading, display loading
    if (loading) {
        return React.createElement("div", null, "Loading...");
    }
    // the action button that will trigger the command
    return (React.createElement("button", { "data-testid": "more", onClick: () => command(new examplewithvalidation_command_1.ExampleWithValidationCommand("Wazzup", "1")) }, "DoSomething"));
};
exports.ExampleValidationCommandComponent = ExampleValidationCommandComponent;
