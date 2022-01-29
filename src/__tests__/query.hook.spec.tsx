import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import * as React from "react";

import useCqrs from "../cqrs.provider";
import { ExampleQueryComponent } from "./fixtures/queries/components/ExampleQuery.component";
import {
    ExampleValidationInjectionComponent,
} from "./fixtures/queries/components/ExampleValidationInjectionQuery.component";
import { ExampleValidationComponent } from "./fixtures/queries/components/ExampleValidationQuery.component";
import { ExampleQueryHandler } from "./fixtures/queries/example.query";
import { ExampleValidationQueryHandler } from "./fixtures/queries/examplevalidation.query";
import { ExampleWithValidationQueryHandler } from "./fixtures/queries/examplewithvalidationinjection.query";

describe("Test Query Hook with various component types", () => {
    beforeEach(() => {
        useCqrs.initialize({
            queries: [ExampleQueryHandler, ExampleValidationQueryHandler, ExampleWithValidationQueryHandler]
        });
    });
    test("should return one item on initial render", async () => {
        // arrange && act
        await act(async () => render(<ExampleQueryComponent />));

        await waitFor(() => screen.getByText(/John/));

        // assert
        expect(screen.getByText(/ExampleQueryComponent/)).toBeTruthy();
        expect(screen.getByText(/John/)).toBeTruthy();
    });

    test("calling `process`, should return two items", async () => {
        // arrange
        await act(async () => render(<ExampleQueryComponent />));

        // act
        fireEvent.click(screen.getByText(/More/));

        // assert
        await waitFor(() => screen.getByText(/John/));

        expect(screen.getByText(/John/)).toBeTruthy();
        expect(screen.getByText(/Sally/)).toBeTruthy();
    });

    test("should return `errors` due to failed validation", async () => {
        // arrange & act
        await act(async () => render(<ExampleValidationComponent />));

        // assert
        await waitFor(() => screen.getByTestId("errors"));
        expect(screen.getByTestId("errors").textContent).toContain("take");
        expect(screen.getByTestId("errors").textContent).toContain("skip");
        expect(screen.getByTestId("errors").textContent).toContain("text");
    });

    test("should return 3 items from example service", async () => {
        // arrange & act
        await act(async () => render(<ExampleValidationInjectionComponent />));

        // assert
        expect(screen.getByText(/John/)).toBeTruthy();
        expect(screen.getByText(/Jane/)).toBeTruthy();
        expect(screen.getByText(/Joe/)).toBeTruthy();
    });
});
