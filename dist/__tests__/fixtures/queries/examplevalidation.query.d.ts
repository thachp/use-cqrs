import { IQuery, IQueryHandler } from "../../..";
export interface ExampleQueryDataItem {
    id: string;
    name: string;
}
export declare class ExampleValidationQuery implements IQuery {
    readonly skip: number;
    readonly take: number;
    readonly text: string;
    constructor(skip?: number, take?: number, text?: string);
}
export declare class ExampleValidationQueryHandler implements IQueryHandler<ExampleValidationQuery> {
    handle(query: ExampleValidationQuery): Promise<{
        data: ExampleQueryDataItem[];
        errors: any[];
    }>;
}
