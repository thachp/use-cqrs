"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExampleValidationCommandComponent = void 0;
const React = require("react");
const command_hook_1 = require("../../../command.hook");
const examplewithvalidation_command_1 = require("../examplewithvalidation.command");
const ExampleValidationCommandComponent = () => {
    // setup command hook
    const [{ loading, error }, command] = (0, command_hook_1.useCommand)();
    // if errors, display them
    if (error) {
        return React.createElement("div", { "data-testid": "errors" }, "Errors...");
    }
    // if loading, display loading
    if (loading) {
        return React.createElement("div", null, "Loading...");
    }
    // the action button that will trigger the command
    return (React.createElement("button", { "data-testid": "more", onClick: () => command(new examplewithvalidation_command_1.ExampleWithValidationCommand("Wazzup", "1")) }, "DoSomething"));
};
exports.ExampleValidationCommandComponent = ExampleValidationCommandComponent;
