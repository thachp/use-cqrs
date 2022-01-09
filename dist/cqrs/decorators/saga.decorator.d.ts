import "reflect-metadata";
/**
 * Decorator that marks a class as a Nest saga. Sagas may listen and react to 1..N events.
 *
 * @see https://docs.nestjs.com/recipes/cqrs#sagas
 */
export declare const Saga: () => PropertyDecorator;