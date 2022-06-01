import { IQuery, IQueryHandler } from "../../..";
export interface ExampleQueryDataItem {
    id: string;
    name: string;
}
export declare class ExampleQuery implements IQuery {
    readonly skip: number;
    readonly take: number;
    constructor(skip?: number, take?: number);
}
export declare class ExampleQueryHandler implements IQueryHandler<ExampleQuery> {
    handle(query: ExampleQuery): Promise<ExampleQueryDataItem[]>;
}
