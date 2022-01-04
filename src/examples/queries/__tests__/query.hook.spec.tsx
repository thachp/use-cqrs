import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import * as React from "react";

import { ExampleQueryComponent } from "../components/ExampleQuery.component";
import { ExampleValidationInjectionComponent } from "../components/ExampleValidationInjectionQuery.component";
import { ExampleValidationComponent } from "../components/ExampleValidationQuery.component";

describe("Test Query Hook with various component types", () => {
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
        expect(screen.getByText(/Errors.../)).toBeTruthy();
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
