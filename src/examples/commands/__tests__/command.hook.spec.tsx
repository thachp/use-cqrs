import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import * as React from "react";

import useCqrs from "../../../cqrs.provider";
import { ExampleCommandComponent } from "../components/ExampleCommand.component";
import { ExampleWithInjectionComponent } from "../components/ExampleInjectionCommand.component";
import { ExampleValidationCommandComponent } from "../components/ExampleValidationCommand.component";
import { ExampleCommandHandler } from "../example.command";
import { ExampleWithInjectionCommandHandler } from "../examplewithinjection.command";
import { ExampleWithValidationCommandHandler } from "../examplewithvalidation.command";

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
