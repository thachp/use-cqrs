import { Injectable, IQuery, IQueryHandler } from "../../..";

export interface ExampleQueryDataItem {
    id: string;
    name: string;
}

export class ExampleQuery implements IQuery {
    constructor(public readonly skip: number = 0, public readonly take: number = 1) {}
}

@Injectable(ExampleQuery)
export class ExampleQueryHandler implements IQueryHandler<ExampleQuery> {
    async handle(query: ExampleQuery) {
        const { skip, take } = query;

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
