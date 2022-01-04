import * as React from "react";

import { useQuery } from "../../../query.hook";
import { ExampleValidationInjectionQuery } from "../examplewithvalidationinjection.query";

export const ExampleValidationInjectionComponent = () => {
    // Query hook
    const [{ loading, error, data }] = useQuery<{ skip: number; take: number; records: Array<any> }, any>(
        new ExampleValidationInjectionQuery(0, 10)
    );

    if (error) {
        return <div>Errors...</div>;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{ExampleValidationInjectionComponent.name}</h1>
            <ul>
                {!data && <li>No data</li>}
                {data &&
                    data.records.map((item) => (
                        <li key={item.id}>
                            {item.id} - {item.name}
                        </li>
                    ))}
            </ul>
        </div>
    );
};
