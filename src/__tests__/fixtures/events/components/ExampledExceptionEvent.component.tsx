import * as React from "react";

import { nameOf } from "../../../../cqrs/operators/of-name";
import { useEvent } from "../../../../event.hook";
import { ExampledExceptionEvent } from "../exampledexception.event";

export const ExampledExceptionEventComponent = () => {
    // setup an emit hook
    const [{ data, error }, emit] = useEvent<ExampledExceptionEvent>(nameOf(ExampledExceptionEvent));

    if (error) {
        return <div data-testid="error">Errors...</div>;
    }

    return (
        <div>
            <h1>{ExampledExceptionEventComponent.name}</h1>
            <button data-testid="emit" onClick={() => emit(new ExampledExceptionEvent("Hello World!"))}>
                Emit
            </button>
            <p data-testid="event">{data?.hello || "No event yet"}</p>
        </div>
    );
};
