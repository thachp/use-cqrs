"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExampleCommandComponent = void 0;
const React = require("react");
const __1 = require("../../../..");
const example_command_1 = require("../example.command");
const ExampleCommandComponent = () => {
    // setup command hook
    const [{ loading, error }, command] = (0, __1.useCommand)();
    // if errors, display them
    if (error) {
        return React.createElement("div", { id: "errors" }, "Errors...");
    }
    // if loading, display loading
    if (loading) {
        return React.createElement("div", null, "Loading...");
    }
    // the action button that will trigger the command
    return (React.createElement("button", { "data-testid": "more", onClick: () => command(new example_command_1.ExampleCommand("Hello", "World")) }, "DoSomething"));
};
exports.ExampleCommandComponent = ExampleCommandComponent;
