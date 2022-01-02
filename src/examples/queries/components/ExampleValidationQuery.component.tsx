import * as React from "react";

import { useQuery } from "../../../query.hook";
import { ExampleValidationQuery } from "../examplevalidation.query";

export const ExampleValidationComponent = () => {
    // Query hook
    const [{ loading, errors, data }, process] = useQuery<[ExampleValidationQuery], any>(
        new ExampleValidationQuery(-1000, 1000)
    );

    if (errors && errors.length > 0) {
        return <div>Errors...</div>;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return <div>Shouldn't get here</div>;
};
