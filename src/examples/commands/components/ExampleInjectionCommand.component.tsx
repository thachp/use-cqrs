import * as React from "react";

import { useCommand } from "../../../command.hook";
import { ExampleWithInjectionCommand } from "../examplewithinjection.command";

export const ExampleWithInjectionComponent = () => {
    // Command hook
    const [{ loading, errors }, command] = useCommand<
        [
            {
                type: string;
                message: string;
            }
        ]
    >(new ExampleWithInjectionCommand("Hello", "World"));

    if (errors && errors.length > 0) {
        return (
            <div data-testid="errors">
                {errors.map((error: any, index: number) => (
                    <div key={index}>
                        {error.type} : {error.message}
                    </div>
                ))}
            </div>
        );
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <button data-testid="more" onClick={() => command()}>
            More
        </button>
    );
};
