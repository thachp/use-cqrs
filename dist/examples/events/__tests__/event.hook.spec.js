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
const ExampledEvent_component_1 = require("../components/ExampledEvent.component");
const exampled_event_1 = require("../exampled.event");
const exampledexception_event_1 = require("../exampledexception.event");
describe("Test Event Hook with various component types", () => {
    beforeEach(() => {
        cqrs_provider_1.useCqrs.initialize({
            events: [exampled_event_1.ExampledEventHandler, exampledexception_event_1.ExampledExceptionEventHandler]
        });
    });
    test("emit an event with hello world", () => __awaiter(void 0, void 0, void 0, function* () {
        // arrange && act
        yield (0, react_1.act)(() => __awaiter(void 0, void 0, void 0, function* () { return (0, react_1.render)(React.createElement(ExampledEvent_component_1.ExampledEventComponent, null)); }));
        // act
        react_1.fireEvent.click(react_1.screen.getByText(/Emit/));
        yield (0, react_1.waitFor)(() => react_1.screen.getByText(/Hello/));
        // assert
        expect(react_1.screen.getByTestId(/event/).textContent).toBe("Hello World!");
    }));
});
