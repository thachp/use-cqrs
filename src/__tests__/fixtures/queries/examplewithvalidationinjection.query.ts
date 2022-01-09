import { IsNumber, Max, Min } from "class-validator";
import { Service as Injectable } from "typedi";

import { IQuery, IQueryHandler, QueryHandler } from "../../../cqrs";

export interface ExampleQueryDataItem {
    id: string;
    name: string;
}

@Injectable()
class ExampleService {
    getRecords(): Array<ExampleQueryDataItem> {
        return [
            { id: "1", name: "John Doe" },
            { id: "2", name: "Jane Doe" },
            { id: "3", name: "Joe Doe" }
        ];
    }
}

export class ExampleValidationInjectionQuery implements IQuery {
    @IsNumber()
    @Min(0)
    public readonly skip: number;

    @IsNumber()
    @Max(10)
    @Min(0)
    public readonly take: number;

    constructor(skip: number = 0, take: number = 5) {
        this.skip = skip;
        this.take = take;
    }
}

@Injectable()
@QueryHandler(ExampleValidationInjectionQuery)
export class ExampleWithValidationQueryHandler implements IQueryHandler<ExampleValidationInjectionQuery> {
    constructor(public readonly exampleService: ExampleService) {}

    async process(query: ExampleValidationInjectionQuery) {
        const { skip, take } = query;

        // call injected service
        const records = this.exampleService.getRecords();

        console.log("example-query-withvalidationinjection", skip, take);

        // return the data
        return { skip, take, records };
    }
}
