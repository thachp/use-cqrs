"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExampleValidationComponent = void 0;
const React = require("react");
const __1 = require("../../../..");
const examplevalidation_query_1 = require("../examplevalidation.query");
const ExampleValidationComponent = () => {
    // Query hook
    const [{ loading, error }] = (0, __1.useQuery)(new examplevalidation_query_1.ExampleValidationQuery(-1000, 1000, "failed-validation"));
    if (error) {
        return (React.createElement("div", { "data-testid": "errors" }, error.map((e) => (React.createElement("div", { key: e.property }, e.property)))));
    }
    if (loading) {
        return React.createElement("div", null, "Loading...");
    }
    return React.createElement("div", null, "Shouldn't get here");
};
exports.ExampleValidationComponent = ExampleValidationComponent;
