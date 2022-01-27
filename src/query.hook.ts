import "reflect-metadata";

import * as Validator from "class-validator";
import * as React from "react";
import { Container as IoC } from "typedi";

import { IQuery, QueryBus } from "./cqrs";

export interface IQueryResults<TData, TError> {
    loading: boolean;
    data: TData;
    error: TError | Array<Validator.ValidationError>;
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
export const useQuery = <TData = any, TError = [Validator.ValidationError]>(
    query: IQuery,
    validatorOptions?: Validator.ValidatorOptions
): [IQueryResults<TData, TError>, (query: IQuery) => void] => {
    const [result, setResult] = React.useState<{
        loading: boolean;
        data: TData;
        error: TError | Array<Validator.ValidationError>;
    }>({
        loading: true,
        data: null,
        error: null
    });

    const queryBus = IoC.get(QueryBus);

    // for lazy loading
    const process = React.useCallback(async (query: IQuery) => {
        const errors = await Validator.validate(query, validatorOptions);

        if (errors.length > 0) {
            return setResult({
                loading: false,
                data: null,
                error: errors
            });
        }

        try {
            const results = await queryBus.process(query);
            return setResult({
                loading: false,
                data: results,
                error: null
            });
        } catch (error: any) {
            return setResult({
                loading: false,
                data: null,
                error
            });
        }
    }, []);

    // call process one time on the first render
    React.useEffect(() => {
        process(query);
    }, []);

    return [result, process];
};

export default useQuery;
