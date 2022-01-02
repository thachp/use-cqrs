import Container from "typedi";

import { IQuery, QueryBus } from "./cqrs";

/**
 * The Query object is used to send a query to the query bus.
 * @param query
 */
export const useQuery = (query: IQuery) => {
    const queryBus = Container.get(QueryBus);
    const results = queryBus.process(query);
};

export default useQuery;
