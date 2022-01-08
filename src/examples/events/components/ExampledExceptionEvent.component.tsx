import * as React from "react";

import { nameOf } from "../../../cqrs/operators/of-name";
import { useEvent } from "../../../event.hook";
import { ExampledExceptionEvent } from "../exampledexception.event";

export const ExampledExceptionEventComponent = () => {
    // setup an emit hook
    const [event, emit] = useEvent<ExampledExceptionEvent>(nameOf(ExampledExceptionEvent));

    return (
        <div>
            <h1>{ExampledExceptionEventComponent.name}</h1>
            <button data-testid="emit" onClick={() => emit(new ExampledExceptionEvent("Hello World!"))}>
                Emit
            </button>
            <p data-testid="event">{event?.hello || "No event yet"}</p>
        </div>
    );
};
