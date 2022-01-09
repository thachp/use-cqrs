"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("@testing-library/react");
const React = require("react");
const cqrs_provider_1 = require("../../../cqrs.provider");
const ExampleQuery_component_1 = require("../components/ExampleQuery.component");
const ExampleValidationInjectionQuery_component_1 = require("../components/ExampleValidationInjectionQuery.component");
const ExampleValidationQuery_component_1 = require("../components/ExampleValidationQuery.component");
const example_query_1 = require("../example.query");
const examplevalidation_query_1 = require("../examplevalidation.query");
const examplewithvalidationinjection_query_1 = require("../examplewithvalidationinjection.query");
describe("Test Query Hook with various component types", () => {
    beforeEach(() => {
        cqrs_provider_1.default.initialize({
            queries: [example_query_1.ExampleQueryHandler, examplevalidation_query_1.ExampleValidationQueryHandler, examplewithvalidationinjection_query_1.ExampleWithValidationQueryHandler]
        });
    });
    test("should return one item on initial render", () => __awaiter(void 0, void 0, void 0, function* () {
        // arrange && act
        yield (0, react_1.act)(() => __awaiter(void 0, void 0, void 0, function* () { return (0, react_1.render)(React.createElement(ExampleQuery_component_1.ExampleQueryComponent, null)); }));
        yield (0, react_1.waitFor)(() => react_1.screen.getByText(/John/));
        // assert
        expect(react_1.screen.getByText(/ExampleQueryComponent/)).toBeTruthy();
        expect(react_1.screen.getByText(/John/)).toBeTruthy();
    }));
    test("calling `process`, should return two items", () => __awaiter(void 0, void 0, void 0, function* () {
        // arrange
        yield (0, react_1.act)(() => __awaiter(void 0, void 0, void 0, function* () { return (0, react_1.render)(React.createElement(ExampleQuery_component_1.ExampleQueryComponent, null)); }));
        // act
        react_1.fireEvent.click(react_1.screen.getByText(/More/));
        // assert
        yield (0, react_1.waitFor)(() => react_1.screen.getByText(/John/));
        expect(react_1.screen.getByText(/John/)).toBeTruthy();
        expect(react_1.screen.getByText(/Sally/)).toBeTruthy();
    }));
    test("should return `errors` due to failed validation", () => __awaiter(void 0, void 0, void 0, function* () {
        // arrange & act
        yield (0, react_1.act)(() => __awaiter(void 0, void 0, void 0, function* () { return (0, react_1.render)(React.createElement(ExampleValidationQuery_component_1.ExampleValidationComponent, null)); }));
        // assert
        expect(react_1.screen.getByText(/Errors.../)).toBeTruthy();
    }));
    test("should return 3 items from example service", () => __awaiter(void 0, void 0, void 0, function* () {
        // arrange & act
        yield (0, react_1.act)(() => __awaiter(void 0, void 0, void 0, function* () { return (0, react_1.render)(React.createElement(ExampleValidationInjectionQuery_component_1.ExampleValidationInjectionComponent, null)); }));
        // assert
        expect(react_1.screen.getByText(/John/)).toBeTruthy();
        expect(react_1.screen.getByText(/Jane/)).toBeTruthy();
        expect(react_1.screen.getByText(/Joe/)).toBeTruthy();
    }));
});
