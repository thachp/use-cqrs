import * as React from "react";

import { nameOf } from "../../../../cqrs";
import useEvent from "../../../../event.hook";
import { ExampledWithValidatorEvent } from "../exampledwithvalidiator.event";

export const ExampleValidationEventComponent = () => {
    // setup event hook
    const [{ error }, emit] = useEvent<ExampledWithValidatorEvent>(nameOf(ExampledWithValidatorEvent));

    // if errors, display them

    if (error) {
        return (
            <div data-testid="errors">
                {error.map((e) => (
                    <div key={e.property}>{e.property}</div>
                ))}
            </div>
        );
    }

    // the action button that will trigger the command
    return (
        <button data-testid="emit" onClick={() => emit(new ExampledWithValidatorEvent("Liliya", "Good Bye"))}>
            Emit
        </button>
    );
};
