import { validate, ValidationError, ValidatorOptions } from "class-validator";
import * as React from "react";
import { Container as IoC } from "typedi";

import { IQueryResults } from "./common/Results";
import { IQuery, QueryBus } from "./cqrs";

/**
 * The Query object is used to send a query to the query bus.
 * @param query
 */
export const useQuery = <TData, TError>(
    query: IQuery,
    validatorOptions?: ValidatorOptions
): [IQueryResults<TData, TError>, (query: IQuery) => void] => {
    const [state, setState] = React.useState<{
        loading: boolean;
        data: TData;
        errors: TError | Array<ValidationError>;
    }>({
        loading: true,
        data: null,
        errors: []
    });

    const queryBus = IoC.get(QueryBus);

    // for lazy loading
    const process = async (query: IQuery) => {
        const errors = await validate(query, validatorOptions);

        if (errors.length > 0) {
            setState({
                loading: false,
                data: null,
                errors: errors
            });
            return;
        }

        // process the query
        const results = await queryBus.process(query);
        setState(results);
    };

    // for the intial render, wait for the query to be processed
    React.useEffect(() => {
        process(query);
    }, []);

    return [state, process];
};

export default useQuery;
