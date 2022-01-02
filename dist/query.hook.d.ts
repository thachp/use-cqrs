import { IQuery } from "./cqrs";
/**
 * The Query object is used to send a query to the query bus.
 * @param query
 */
export declare const useQuery: (query: IQuery) => void;
export default useQuery;
