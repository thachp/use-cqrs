import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import * as React from "react";

import useCqrs from "../cqrs.provider";
import { ExampleCommandComponent } from "./fixtures/commands/components/ExampleCommand.component";
import { ExampleWithInjectionComponent } from "./fixtures/commands/components/ExampleInjectionCommand.component";
import { ExampleValidationCommandComponent } from "./fixtures/commands/components/ExampleValidationCommand.component";
import { ExampleCommandHandler } from "./fixtures/commands/example.command";
import { ExampleWithInjectionCommandHandler } from "./fixtures/commands/examplewithinjection.command";
import { ExampleWithValidationCommandHandler } from "./fixtures/commands/examplewithvalidation.command";

describe("Test Command Hook", () => {
    beforeEach(() => {
        useCqrs.initialize({
            commands: [ExampleCommandHandler, ExampleWithValidationCommandHandler, ExampleWithInjectionCommandHandler]
        });
    });

    test("should render initial view", async () => {
        // arrange && act
        await act(async () => render(<ExampleCommandComponent />));

        // assert
        expect(screen.getByText(/DoSomething/)).toBeTruthy();
        expect(screen.getByTestId("more").textContent).toBe("DoSomething");
    });

    test("should render errors given the command has validation errors", async () => {
        // arrange
        await act(async () => render(<ExampleValidationCommandComponent />));

        // act
        fireEvent.click(screen.getByTestId("more"));

        // assert
        await waitFor(() => screen.getByTestId("errors"));
        expect(screen.getByTestId("errors").textContent).toBe("Errors...");
    });

    test("should render errors from an injected class", async () => {
        // arrange
        await act(async () => render(<ExampleWithInjectionComponent />));

        // act
        fireEvent.click(screen.getByTestId("more"));

        // assert
        await waitFor(() => screen.getByTestId("errors"));
        expect(screen.getByTestId("errors").textContent).toContain("Method not implemented");
    });
});
