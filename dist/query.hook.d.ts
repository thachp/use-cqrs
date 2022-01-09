import "reflect-metadata";
import { ValidationError, ValidatorOptions } from "class-validator";
import { IQuery } from "./cqrs";
export interface IQueryResults<TData, TError> {
    loading: boolean;
    data: TData;
    error: TError | Array<ValidationError>;
}
/**
 * A query ask for something, signal a question.
 * The Query object is loaded on to the query bus.
 * One query is handled by one query handler.
 * Queries return data and should not change the state of the application.
 * @param query
 * @param validatorOptions Optional validator options from class-validator.
 * @returns void
 */
export declare const useQuery: <TData = any, TError = [ValidationError]>(query: IQuery, validatorOptions?: ValidatorOptions) => [IQueryResults<TData, TError>, (query: IQuery) => void];
export default useQuery;
