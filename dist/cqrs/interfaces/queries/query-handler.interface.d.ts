import { IQuery } from "./query.interface";
export interface IQueryHandler<T extends IQuery = any, TRes = any> {
    process(query: T): Promise<TRes>;
}
