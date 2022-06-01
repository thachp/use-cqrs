import * as React from "react";

import { useQuery } from "../../../..";
import { ExampleQuery, ExampleQueryDataItem } from "../example.query";

export const ExampleQueryComponent = () => {
    // Query hook
    const [{ loading, error, data }, process] = useQuery<[ExampleQueryDataItem], any>(new ExampleQuery(0, 1));

    if (error) {
        return <div>Errors...</div>;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    console.log("testing", data);

    return (
        <div>
            <h1>{ExampleQueryComponent.name}</h1>
            <button id="more" onClick={() => process(new ExampleQuery(0, 2))}>
                More
            </button>
            <ul>
                {!data && <li>No data</li>}
                {data &&
                    data.map((item) => (
                        <li key={item.id}>
                            {item.id} - {item.name}
                        </li>
                    ))}
            </ul>
        </div>
    );
};
