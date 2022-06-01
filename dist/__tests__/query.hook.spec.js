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
const ExampleQuery_component_1 = require("./fixtures/queries/components/ExampleQuery.component");
const ExampleValidationInjectionQuery_component_1 = require("./fixtures/queries/components/ExampleValidationInjectionQuery.component");
const ExampleValidationQuery_component_1 = require("./fixtures/queries/components/ExampleValidationQuery.component");
describe("Test Query Hook with various component types", () => {
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
        yield (0, react_1.waitFor)(() => react_1.screen.getByTestId("errors"));
        expect(react_1.screen.getByTestId("errors").textContent).toContain("take");
        expect(react_1.screen.getByTestId("errors").textContent).toContain("skip");
        expect(react_1.screen.getByTestId("errors").textContent).toContain("text");
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
