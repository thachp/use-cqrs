import { ValidationError } from "class-validator";
import * as React from "react";

import { useCommand } from "../../../../command.hook";
import { ExampleWithValidationCommand } from "../examplewithvalidation.command";

export const ExampleValidationCommandComponent = () => {
    // setup command hook
    const [{ loading, error }, command] = useCommand<[ValidationError]>();

    // if errors, display them
    if (error) {
        return <div data-testid="errors">Errors...</div>;
    }

    // if loading, display loading
    if (loading) {
        return <div>Loading...</div>;
    }

    // the action button that will trigger the command
    return (
        <button data-testid="more" onClick={() => command(new ExampleWithValidationCommand("Wazzup", "1"))}>
            DoSomething
        </button>
    );
};
