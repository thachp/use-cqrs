import { IQuery, IQueryHandler } from "../../..";
export interface ExampleQueryDataItem {
    id: string;
    name: string;
}
declare class ExampleService {
    getRecords(): Array<ExampleQueryDataItem>;
}
export declare class ExampleValidationInjectionQuery implements IQuery {
    readonly skip: number;
    readonly take: number;
    constructor(skip?: number, take?: number);
}
export declare class ExampleWithValidationQueryHandler implements IQueryHandler<ExampleValidationInjectionQuery> {
    readonly exampleService: ExampleService;
    constructor(exampleService: ExampleService);
    handle(query: ExampleValidationInjectionQuery): Promise<{
        skip: number;
        take: number;
        records: ExampleQueryDataItem[];
    }>;
}
export {};
