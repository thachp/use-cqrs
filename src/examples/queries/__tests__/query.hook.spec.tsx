import { act, fireEvent, render, screen } from "@testing-library/react";
import * as React from "react";

import { ExampleQueryComponent } from "../components/ExampleQuery.component";
import { ExampleValidationComponent } from "../components/ExampleValidationQuery.component";

describe("Test Query Hook with various component types", () => {
    test("test initial load, should return one item", async () => {
        // arrange && act
        // initially will load one item
        await act(async () => render(<ExampleQueryComponent />));

        // assert
        expect(screen.getByText(/ExampleQueryComponent/)).toBeTruthy();
        expect(screen.getByText(/John/)).toBeTruthy();
    });

    test("calling `process`, should return two items", async () => {
        // arrange
        await act(async () => render(<ExampleQueryComponent />));

        // act
        // load 2 items
        fireEvent.click(screen.getByText(/More/));
        await act(async () => {
            screen.getByText(/John/);
        });

        // assert
        expect(screen.getByText(/John/)).toBeTruthy();
        expect(screen.getByText(/Sally/)).toBeTruthy();
    });

    test("should return `errors` due to failed validation", async () => {
        // arrange & act
        await act(async () => render(<ExampleValidationComponent />));

        // act
        expect(screen.getByText(/Errors.../)).toBeTruthy();
    });
});
