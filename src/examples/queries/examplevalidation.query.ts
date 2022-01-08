import { IsNumber, Max, Min } from "class-validator";

import { IQuery, IQueryHandler, QueryHandler } from "../../cqrs";

export interface ExampleQueryDataItem {
    id: string;
    name: string;
}

export class ExampleValidationQuery implements IQuery {
    @IsNumber()
    @Min(0)
    public readonly skip: number;

    @IsNumber()
    @Max(10)
    @Min(0)
    public readonly take: number;

    constructor(skip: number = 0, take: number = 1) {
        this.skip = skip;
        this.take = take;
    }
}

@QueryHandler(ExampleValidationQuery)
export class ExampleValidationQueryHandler implements IQueryHandler<ExampleValidationQuery> {
    async process(query: ExampleValidationQuery) {
        const { skip, take } = query;

        console.log("examplevalidation-query", skip, take);

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
        return {
            data,
            errors: []
        };
    }
}
