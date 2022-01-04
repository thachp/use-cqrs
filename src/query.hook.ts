import { validate, ValidationError, ValidatorOptions } from "class-validator";
import * as React from "react";
import { Container as IoC } from "typedi";

import { IQuery, QueryBus } from "./cqrs";

export interface IQueryResults<TData, TError> {
    loading: boolean;
    data: TData;
    error: TError | Array<ValidationError>;
}

/**
 * The Query object is used to send a query to the query bus.
 * @param query
 */
export const useQuery = <TData = any, TError = [ValidationError]>(
    query: IQuery,
    validatorOptions?: ValidatorOptions
): [IQueryResults<TData, TError>, (query: IQuery) => void] => {
    const [result, setResult] = React.useState<{
        loading: boolean;
        data: TData;
        error: TError | Array<ValidationError>;
    }>({
        loading: true,
        data: null,
        error: null
    });

    const queryBus = IoC.get(QueryBus);

    // for lazy loading
    const process = async (query: IQuery) => {
        const errors = await validate(query, validatorOptions);

        if (errors.length > 0) {
            setResult({
                loading: false,
                data: null,
                error: errors
            });
            return;
        }

        try {
            // process the query
            const results = await queryBus.process(query);
            setResult({
                loading: false,
                data: results,
                error: null
            });
        } catch (error: any) {
            setResult({
                loading: false,
                data: null,
                error
            });
        }
    };

    // for the intial render, wait for the query to be processed
    React.useEffect(() => {
        process(query);
    }, []);

    return [result, process];
};

export default useQuery;
