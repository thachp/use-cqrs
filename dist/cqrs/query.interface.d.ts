import { IRequest, IRequestHandler } from "mediatr-ts";
export interface IQuery<TRequest = any> extends IRequest<TRequest> {
}
export interface IQueryHandler<TQuery extends IQuery<any>, TResponse = any> extends IRequestHandler<TQuery, TResponse> {
}
