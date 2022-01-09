import { IQuery, IQueryHandler } from "../../cqrs";
export interface ExampleQueryDataItem {
    id: string;
    name: string;
}
export declare class ExampleValidationQuery implements IQuery {
    readonly skip: number;
    readonly take: number;
    constructor(skip?: number, take?: number);
}
export declare class ExampleValidationQueryHandler implements IQueryHandler<ExampleValidationQuery> {
    process(query: ExampleValidationQuery): Promise<{
        data: ExampleQueryDataItem[];
        errors: any[];
    }>;
}
