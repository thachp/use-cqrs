"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExampleValidationInjectionComponent = void 0;
const React = require("react");
const query_hook_1 = require("../../../query.hook");
const examplewithvalidationinjection_query_1 = require("../examplewithvalidationinjection.query");
const ExampleValidationInjectionComponent = () => {
    // Query hook
    const [{ loading, error, data }] = (0, query_hook_1.useQuery)(new examplewithvalidationinjection_query_1.ExampleValidationInjectionQuery(0, 10));
    if (error) {
        return React.createElement("div", null, "Errors...");
    }
    if (loading) {
        return React.createElement("div", null, "Loading...");
    }
    return (React.createElement("div", null,
        React.createElement("h1", null, exports.ExampleValidationInjectionComponent.name),
        React.createElement("ul", null,
            !data && React.createElement("li", null, "No data"),
            data &&
                data.records.map((item) => (React.createElement("li", { key: item.id },
                    item.id,
                    " - ",
                    item.name))))));
};
exports.ExampleValidationInjectionComponent = ExampleValidationInjectionComponent;
