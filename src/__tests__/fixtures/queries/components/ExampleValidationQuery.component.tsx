import * as React from "react";

import { useQuery } from "../../../..";
import { ExampleValidationQuery } from "../examplevalidation.query";

export const ExampleValidationComponent = () => {
    // Query hook
    const [{ loading, error }] = useQuery<[ExampleValidationQuery], any>(
        new ExampleValidationQuery(-1000, 1000, "failed-validation")
    );

    if (error) {
        return (
            <div data-testid="errors">
                {error.map((e) => (
                    <div key={e.property}>{e.property}</div>
                ))}
            </div>
        );
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return <div>Shouldn't get here</div>;
};
