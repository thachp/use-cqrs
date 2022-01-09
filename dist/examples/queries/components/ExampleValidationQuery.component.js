"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExampleValidationComponent = void 0;
const React = require("react");
const query_hook_1 = require("../../../query.hook");
const examplevalidation_query_1 = require("../examplevalidation.query");
const ExampleValidationComponent = () => {
    // Query hook
    const [{ loading, error }] = (0, query_hook_1.useQuery)(new examplevalidation_query_1.ExampleValidationQuery(-1000, 1000));
    if (error && error.length > 0) {
        return React.createElement("div", null, "Errors...");
    }
    if (loading) {
        return React.createElement("div", null, "Loading...");
    }
    return React.createElement("div", null, "Shouldn't get here");
};
exports.ExampleValidationComponent = ExampleValidationComponent;
