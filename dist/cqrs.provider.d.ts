import { CommandBus } from "./cqrs/command-bus";
import { EventBus } from "./cqrs/event-bus";
import { CqrsOptions } from "./cqrs/interfaces/cqrs-options.interface";
import { QueryBus } from "./cqrs/query-bus";
export declare class CqrsModule {
    private readonly eventsBus;
    private readonly commandsBus;
    private readonly queryBus;
    constructor(eventsBus: EventBus, commandsBus: CommandBus, queryBus: QueryBus);
    initialize(options?: CqrsOptions): void;
}
export declare const useCqrs: CqrsModule;
export default useCqrs;
