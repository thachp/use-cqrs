import { useContainer } from "class-validator";
import { Container, Service as Injectable } from "typedi";

import { CommandBus } from "./cqrs/command-bus";
import { EventBus } from "./cqrs/event-bus";
import { CqrsOptions } from "./cqrs/interfaces/cqrs-options.interface";
import { QueryBus } from "./cqrs/query-bus";

@Injectable()
export class CqrsModule {
    constructor(
        private readonly eventsBus: EventBus,
        private readonly commandsBus: CommandBus,
        private readonly queryBus: QueryBus
    ) {}

    initialize(options: CqrsOptions = {}) {
        const { events = [], queries = [], sagas = [], commands = [] } = options;
        this.eventsBus.register(events);
        this.commandsBus.register(commands);
        this.queryBus.register(queries);
        this.eventsBus.registerSagas(sagas);
    }
}

// inject dependencies into custom validator constraint classes
useContainer(Container, { fallbackOnErrors: true });

export const useCqrs = Container.get(CqrsModule);

export default useCqrs;
