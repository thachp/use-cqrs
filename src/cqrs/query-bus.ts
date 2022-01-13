import "reflect-metadata";

import { Container, Service as Injectable } from "typedi";

import { QUERY_HANDLER_METADATA, QUERY_METADATA } from "./decorators/constants";
import { QueryHandlerNotFoundException } from "./exceptions";
import { InvalidQueryHandlerException } from "./exceptions/invalid-query-handler.exception";
import { DefaultQueryPubSub } from "./helpers/default-query-pubsub";
import { IQuery, IQueryBus, IQueryHandler, IQueryPublisher, IQueryResult } from "./interfaces";
import { QueryMetadata } from "./interfaces/queries/query-metadata.interface";
import { Type } from "./interfaces/type.interface";
import { ObservableBus } from "./utils/observable-bus";

export type QueryHandlerType<
    QueryBase extends IQuery = IQuery,
    QueryResultBase extends IQueryResult = IQueryResult
> = Type<IQueryHandler<QueryBase, QueryResultBase>>;

@Injectable()
export class QueryBus<QueryBase extends IQuery = IQuery>
    extends ObservableBus<QueryBase>
    implements IQueryBus<QueryBase>
{
    private handlers = new Map<string, IQueryHandler<QueryBase, IQueryResult>>();
    private _publisher: IQueryPublisher<QueryBase>;
    private readonly moduleRef = Container;

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
        const queryId = this.getQueryId(query);
        const handler = this.handlers.get(queryId);
        if (!handler) {
            throw new QueryHandlerNotFoundException(queryId);
        }

        this.subject$.next(query);
        const result = await handler.process(query);
        return result as TResult;
    }

    register(handlers: QueryHandlerType<QueryBase>[] = []) {
        handlers.forEach((handler) => this.registerHandler(handler));
    }

    protected registerHandler(handler: QueryHandlerType<QueryBase>) {
        const instance = this.moduleRef.get(handler);
        if (!instance) {
            return;
        }
        const target = this.reflectQueryId(handler);
        if (!target) {
            throw new InvalidQueryHandlerException();
        }
        this.bind(instance as IQueryHandler<QueryBase, IQueryResult>, target);
    }

    private bind<T extends QueryBase, TResult = any>(handler: IQueryHandler<T, TResult>, queryId: string) {
        this.handlers.set(queryId, handler);
    }

    private getQueryId(query: QueryBase): string {
        const { constructor: queryType } = Object.getPrototypeOf(query);
        const queryMetadata: QueryMetadata = Reflect.getMetadata(QUERY_METADATA, queryType);
        if (!queryMetadata) {
            throw new QueryHandlerNotFoundException(queryType.name);
        }

        return queryMetadata.id;
    }

    private reflectQueryId(handler: QueryHandlerType<QueryBase>): string | undefined {
        const query: Type<QueryBase> = Reflect.getMetadata(QUERY_HANDLER_METADATA, handler);
        const queryMetadata: QueryMetadata = Reflect.getMetadata(QUERY_METADATA, query);
        return queryMetadata.id;
    }

    private useDefaultPublisher() {
        this._publisher = new DefaultQueryPubSub<QueryBase>(this.subject$);
    }
}
