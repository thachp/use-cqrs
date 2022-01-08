import { IQuery, IQueryHandler, QueryHandler } from "../../cqrs";

export interface ExampleQueryDataItem {
    id: string;
    name: string;
}

export class ExampleQuery implements IQuery {
    constructor(public readonly skip: number = 0, public readonly take: number = 1) {}
}

@QueryHandler(ExampleQuery)
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
