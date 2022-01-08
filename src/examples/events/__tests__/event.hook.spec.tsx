import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import * as React from "react";

import { ExampledEventComponent } from "../components/ExampledEvent.component";
import { ExampledExceptionEventComponent } from "../components/ExampledExceptionEvent.component";

describe("Test Event Hook with various component types", () => {
    test("emit an event with hello world", async () => {
        // arrange && act
        await act(async () => render(<ExampledEventComponent />));

        // act
        fireEvent.click(screen.getByText(/Emit/));

        await waitFor(() => screen.getByText(/Hello/));

        // assert
        expect(screen.getByTestId(/event/).textContent).toBe("Hello World!");
    });

    test("event handler throw exception", async () => {
        // arrange && act
        await act(async () => render(<ExampledExceptionEventComponent />));

        // act
        fireEvent.click(screen.getByText(/Emit/));

        await waitFor(() => screen.getByText(/Error/));

        // assert
        expect(screen.getByTestId(/error/).textContent).toBe("Error...");
    });
});
