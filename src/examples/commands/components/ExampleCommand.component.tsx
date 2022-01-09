import * as React from "react";

import { useCommand } from "../../../command.hook";
import { ExampleCommand } from "../example.command";

export const ExampleCommandComponent = () => {
    // setup command hook
    const [{ loading, error }, command] = useCommand<any>();

    // if errors, display them
    if (error) {
        return <div id="errors">Errors...</div>;
    }

    // if loading, display loading
    if (loading) {
        return <div>Loading...</div>;
    }

    // the action button that will trigger the command
    return (
        <button data-testid="more" onClick={() => command(new ExampleCommand("Hello", "World"))}>
            DoSomething
        </button>
    );
};
