import { ValidationError } from "class-validator";
import { IQuery } from "../cqrs";
export interface IResults {
}
export declare abstract class Results implements IResults {
}
export declare class EventResults<TData> extends Results {
    handle: (event: IQuery) => Promise<TData>;
    data: TData;
}
export interface CommandResults<TError> extends Results {
    loading: boolean;
    errors?: TError | Array<ValidationError>;
}
export interface QueryResults<TData, TError> extends CommandResults<TError> {
    process: (query: IQuery) => Promise<any>;
    data: TData;
}
