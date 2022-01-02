import { ValidationError } from "class-validator";

import { IQuery } from "../cqrs";

export interface IResults {}

export abstract class Results implements IResults {}

export class EventResults<TData> extends Results {
    handle: (event: IQuery) => Promise<TData>;
    data: TData;
}

export interface CommandResults<TError> {
    loading: boolean;
    errors: TError | Array<ValidationError>;
}
export interface IQueryResults<TData, TError> {
    loading: boolean;
    data: TData;
    errors: TError | Array<ValidationError>;
}
