"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExampleQueryComponent = void 0;
const React = require("react");
const query_hook_1 = require("../../../query.hook");
const example_query_1 = require("../example.query");
const ExampleQueryComponent = () => {
    // Query hook
    const [{ loading, error, data }, process] = (0, query_hook_1.useQuery)(new example_query_1.ExampleQuery(0, 1));
    if (error) {
        return React.createElement("div", null, "Errors...");
    }
    if (loading) {
        return React.createElement("div", null, "Loading...");
    }
    return (React.createElement("div", null,
        React.createElement("h1", null, exports.ExampleQueryComponent.name),
        React.createElement("button", { id: "more", onClick: () => process(new example_query_1.ExampleQuery(0, 2)) }, "More"),
        React.createElement("ul", null,
            !data && React.createElement("li", null, "No data"),
            data &&
                data.map((item) => (React.createElement("li", { key: item.id },
                    item.id,
                    " - ",
                    item.name))))));
};
exports.ExampleQueryComponent = ExampleQueryComponent;
