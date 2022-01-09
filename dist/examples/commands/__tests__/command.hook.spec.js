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
const ExampleCommand_component_1 = require("../components/ExampleCommand.component");
const ExampleInjectionCommand_component_1 = require("../components/ExampleInjectionCommand.component");
const ExampleValidationCommand_component_1 = require("../components/ExampleValidationCommand.component");
const example_command_1 = require("../example.command");
const examplewithinjection_command_1 = require("../examplewithinjection.command");
const examplewithvalidation_command_1 = require("../examplewithvalidation.command");
describe("Test Command Hook", () => {
    beforeEach(() => {
        cqrs_provider_1.default.initialize({
            commands: [example_command_1.ExampleCommandHandler, examplewithvalidation_command_1.ExampleWithValidationCommandHandler, examplewithinjection_command_1.ExampleWithInjectionCommandHandler]
        });
    });
    test("should render initial view", () => __awaiter(void 0, void 0, void 0, function* () {
        // arrange && act
        yield (0, react_1.act)(() => __awaiter(void 0, void 0, void 0, function* () { return (0, react_1.render)(React.createElement(ExampleCommand_component_1.ExampleCommandComponent, null)); }));
        // assert
        expect(react_1.screen.getByText(/DoSomething/)).toBeTruthy();
        expect(react_1.screen.getByTestId("more").textContent).toBe("DoSomething");
    }));
    test("should render errors given the command has validation errors", () => __awaiter(void 0, void 0, void 0, function* () {
        // arrange
        yield (0, react_1.act)(() => __awaiter(void 0, void 0, void 0, function* () { return (0, react_1.render)(React.createElement(ExampleValidationCommand_component_1.ExampleValidationCommandComponent, null)); }));
        // act
        react_1.fireEvent.click(react_1.screen.getByTestId("more"));
        // assert
        yield (0, react_1.waitFor)(() => react_1.screen.getByTestId("errors"));
        expect(react_1.screen.getByTestId("errors").textContent).toBe("Errors...");
    }));
    test("should render errors from an injected class", () => __awaiter(void 0, void 0, void 0, function* () {
        // arrange
        yield (0, react_1.act)(() => __awaiter(void 0, void 0, void 0, function* () { return (0, react_1.render)(React.createElement(ExampleInjectionCommand_component_1.ExampleWithInjectionComponent, null)); }));
        // act
        react_1.fireEvent.click(react_1.screen.getByTestId("more"));
        // assert
        yield (0, react_1.waitFor)(() => react_1.screen.getByTestId("errors"));
        expect(react_1.screen.getByTestId("errors").textContent).toContain("Method not implemented");
    }));
});
