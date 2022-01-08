import * as React from "react";

import { nameOf } from "../../../cqrs/operators/of-name";
import { useEvent } from "../../../event.hook";
import { ExampledEvent } from "../exampled.event";

export const ExampledEventComponent = () => {
    // setup an emit hook
    const [event, emit] = useEvent<ExampledEvent>(nameOf(ExampledEvent));

    return (
        <div>
            <h1>{ExampledEventComponent.name}</h1>
            <button data-testid="emit" onClick={() => emit(new ExampledEvent("Hello World!"))}>
                Emit
            </button>
            <p data-testid="event">{event?.hello || "No event yet"}</p>
        </div>
    );
};
