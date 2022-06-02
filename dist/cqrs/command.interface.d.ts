import { IRequest, IRequestHandler } from "mediatr-ts";
export interface ICommand<TRequest = any> extends IRequest<TRequest> {
}
export interface ICommandHandler<TCommand extends ICommand<any>, TResponse = any> extends IRequestHandler<TCommand, TResponse> {
}
