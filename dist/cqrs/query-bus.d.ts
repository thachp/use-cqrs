import "reflect-metadata";
import { IQuery, IQueryBus, IQueryHandler, IQueryPublisher, IQueryResult } from "./interfaces";
import { Type } from "./interfaces/type.interface";
import { ObservableBus } from "./utils/observable-bus";
export declare type QueryHandlerType<QueryBase extends IQuery = IQuery, QueryResultBase extends IQueryResult = IQueryResult> = Type<IQueryHandler<QueryBase, QueryResultBase>>;
export declare class QueryBus<QueryBase extends IQuery = IQuery> extends ObservableBus<QueryBase> implements IQueryBus<QueryBase> {
    private _publisher;
    constructor();
    get publisher(): IQueryPublisher<QueryBase>;
    set publisher(_publisher: IQueryPublisher<QueryBase>);
    process<T extends QueryBase, TResult = any>(query: T): Promise<TResult>;
    private useDefaultPublisher;
}
