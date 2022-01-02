import { Observable } from "rxjs";
import { filter } from "rxjs/operators";

import { IEvent } from "../interfaces";
import { Type } from "../interfaces/type.interface";

/**
 * Filter values depending on their instance type (comparison is made
 * using native `instanceof`).
 *
 * @param types List of types implementing `IEvent`.
 *
 * @return A stream only emitting the filtered instances.
 */
export function ofType<TInput extends IEvent, TOutput extends IEvent>(...types: Type<TOutput>[]) {
    const isInstanceOf = (event: IEvent): event is TOutput => !!types.find((classType) => event instanceof classType);
    return (source: Observable<TInput>): Observable<TOutput> => source.pipe(filter(isInstanceOf));
}
