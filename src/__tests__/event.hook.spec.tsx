import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import * as React from "react";

import { useCqrs } from "../cqrs.provider";
import { ExampledEventComponent } from "./fixtures/events/components/ExampledEvent.component";
import { ExampleValidationEventComponent } from "./fixtures/events/components/ExampleValidationEvent.component";
import { ExampledEventHandler } from "./fixtures/events/exampled.event";

describe("Test Event Hook with various component types", () => {
    beforeEach(() => {
        useCqrs.initialize({
            events: [ExampledEventHandler]
        });
    });

    test("emit an event with hello world", async () => {
        // arrange && act
        await act(async () => render(<ExampledEventComponent />));

        // act
        fireEvent.click(screen.getByText(/Emit/));

        await waitFor(() => screen.getByText(/Hello/));

        // assert
        expect(screen.getByTestId(/event/).textContent).toBe("Hello World!");
    });

    test("emit an event with hello world", async () => {
        // arrange && act
        await act(async () => render(<ExampleValidationEventComponent />));

        // act
        fireEvent.click(screen.getByText(/Emit/));

        await waitFor(() => screen.getByTestId("errors"));

        // assert
        expect(screen.getByTestId("errors").textContent).toContain("name");
        expect(screen.getByTestId("errors").textContent).toContain("hello");
    });
});
