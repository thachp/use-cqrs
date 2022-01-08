import { Service as Injectable } from "typedi";

import { IQuery, IQueryHandler } from "../../cqrs";
import { nameOf } from "../../cqrs/operators/of-name";

export interface ExampleQueryDataItem {
    id: string;
    name: string;
}

export class ExampleQuery implements IQuery {
    public readonly skip: number;
    public readonly take: number;

    constructor(skip: number = 0, take: number = 1) {
        this.skip = skip;
        this.take = take;
    }
}

@Injectable(nameOf(ExampleQuery))
export class ExampleQueryHandler implements IQueryHandler<ExampleQuery> {
    async process(query: ExampleQuery) {
        const { skip, take } = query;

        console.log("example-query", skip, take);

        // sample data
        const data: Array<ExampleQueryDataItem> = [
            {
                id: "1",
                name: "John Doe"
            }
        ];

        if (take > 1) {
            data.push({
                id: "2",
                name: "Sally Doe"
            });
        }

        // return the data
        return data;
    }
}
