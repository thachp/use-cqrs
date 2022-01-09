import * as React from "react";

import { useCommand } from "../../../../command.hook";
import { ExampleWithInjectionCommand } from "../examplewithinjection.command";

export const ExampleWithInjectionComponent = () => {
    // Command hook
    const [{ loading, error }, command] = useCommand<any>();

    if (error) {
        return (
            <div data-testid="errors">
                <div>{error.message}</div>
            </div>
        );
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <button data-testid="more" onClick={() => command(new ExampleWithInjectionCommand("Hello", "World"))}>
            More
        </button>
    );
};
