import * as React from "react";

import { useQuery } from "../../../query.hook";
import { ExampleQuery, ExampleQueryDataItem } from "../example.query";

export const ExampleQueryComponent = () => {
    // Query hook
    const [{ loading, errors, data }, process] = useQuery<[ExampleQueryDataItem], any>(new ExampleQuery(0, 1));

    if (errors && errors.length > 0) {
        return <div>Errors...</div>;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{ExampleQueryComponent.name}</h1>
            <button id="more" onClick={() => process(new ExampleQuery(0, 2))}>
                More
            </button>
            <ul>
                {data.map((item) => (
                    <li key={item.id}>
                        {item.id} - {item.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};
