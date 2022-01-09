import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import * as React from "react";

import { useCqrs } from "../cqrs.provider";
import { ExampledEventComponent } from "./fixtures/events/components/ExampledEvent.component";
import { ExampledEventHandler } from "./fixtures/events/exampled.event";
import { ExampledExceptionEventHandler } from "./fixtures/events/exampledexception.event";

describe("Test Event Hook with various component types", () => {
    beforeEach(() => {
        useCqrs.initialize({
            events: [ExampledEventHandler, ExampledExceptionEventHandler]
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
});
