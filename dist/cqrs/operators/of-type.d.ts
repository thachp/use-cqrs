import { Observable } from "rxjs";
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
export declare function ofType<TInput extends IEvent, TOutput extends IEvent>(...types: Type<TOutput>[]): (source: Observable<TInput>) => Observable<TOutput>;