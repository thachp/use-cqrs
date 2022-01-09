import "reflect-metadata";
import { ValidationError, ValidatorOptions } from "class-validator";
import { IQuery } from "./cqrs";
export interface IQueryResults<TData, TError> {
    loading: boolean;
    data: TData;
    error: TError | Array<ValidationError>;
}
/**
 * The Query object is used to send a query to the query bus.
 * @param query
 */
export declare const useQuery: <TData = any, TError = [ValidationError]>(query: IQuery, validatorOptions?: ValidatorOptions) => [IQueryResults<TData, TError>, (query: IQuery) => void];
export default useQuery;
