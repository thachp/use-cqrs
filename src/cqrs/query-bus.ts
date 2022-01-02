import "reflect-metadata";

import Container, { Service } from "typedi";

import { QueryHandlerNotFoundException } from "./exceptions";
import { DefaultQueryPubSub } from "./helpers/default-query-pubsub";
import { IQuery, IQueryBus, IQueryHandler, IQueryPublisher, IQueryResult } from "./interfaces";
import { Type } from "./interfaces/type.interface";
import { ObservableBus } from "./utils/observable-bus";

export type QueryHandlerType<
    QueryBase extends IQuery = IQuery,
    QueryResultBase extends IQueryResult = IQueryResult
> = Type<IQueryHandler<QueryBase, QueryResultBase>>;

@Service()
export class QueryBus<QueryBase extends IQuery = IQuery>
    extends ObservableBus<QueryBase>
    implements IQueryBus<QueryBase>
{
    private _publisher: IQueryPublisher<QueryBase>;

    constructor() {
        super();
        this.useDefaultPublisher();
    }

    get publisher(): IQueryPublisher<QueryBase> {
        return this._publisher;
    }

    set publisher(_publisher: IQueryPublisher<QueryBase>) {
        this._publisher = _publisher;
    }

    async process<T extends QueryBase, TResult = any>(query: T): Promise<TResult> {
        const handler = Container.get<IQueryHandler>(query.constructor.name);

        if (!handler) {
            throw new QueryHandlerNotFoundException(query.constructor.name);
        }

        this.subject$.next(query);
        const result = await handler.process(query);
        return result as TResult;
    }

    private useDefaultPublisher() {
        this._publisher = new DefaultQueryPubSub<QueryBase>(this.subject$);
    }
}
