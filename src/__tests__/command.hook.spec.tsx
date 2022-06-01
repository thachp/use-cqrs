import { act, render, screen } from "@testing-library/react";
import * as React from "react";

import { ExampleCommandComponent } from "./fixtures/commands/components/ExampleCommand.component";

describe("Test Command Hook", () => {
    test("should render initial view", async () => {
        // arrange && act
        await act(async () => render(<ExampleCommandComponent />));

        // assert
        expect(screen.getByText(/DoSomething/)).toBeTruthy();
        expect(screen.getByTestId("more").textContent).toBe("DoSomething");
    });

    // test("should render errors given the command has validation errors", async () => {
    //     // arrange
    //     await act(async () => render(<ExampleValidationCommandComponent />));

    //     // act
    //     fireEvent.click(screen.getByTestId("more"));

    //     // assert
    //     await waitFor(() => screen.getByTestId("errors"));
    //     expect(screen.getByTestId("errors").textContent).toContain("hello");
    //     expect(screen.getByTestId("errors").textContent).toContain("name");
    // });

    // test("should render errors from an injected class", async () => {
    //     // arrange
    //     await act(async () => render(<ExampleWithInjectionComponent />));

    //     // act
    //     fireEvent.click(screen.getByTestId("more"));

    //     // assert
    //     await waitFor(() => screen.getByTestId("errors"));
    //     expect(screen.getByTestId("errors").textContent).toContain("Method not implemented");
    // });
});
