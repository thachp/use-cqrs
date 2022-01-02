import { IQuery } from "./query.interface";
export interface IQueryBus<QueryBase extends IQuery = IQuery> {
    process<T extends QueryBase = QueryBase, TRes = any>(query: T): Promise<TRes>;
}
