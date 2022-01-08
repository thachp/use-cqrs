import * as React from "react";
import { Container, Service as Injectable } from "typedi";

import { CommandBus } from "./cqrs/command-bus";
import { EventBus } from "./cqrs/event-bus";
import { QueryBus } from "./cqrs/query-bus";
import { ExplorerService } from "./cqrs/services/explorer.service";

@Injectable()
export class CqrsModule {
    constructor(
        private readonly explorerService: ExplorerService,
        private readonly eventsBus: EventBus,
        private readonly commandsBus: CommandBus,
        private readonly queryBus: QueryBus
    ) {}

    initialize(onStart: () => void = () => {}) {
        const { events, queries, sagas, commands } = this.explorerService.explore();
        this.eventsBus.register(events);
        this.commandsBus.register(commands);
        this.queryBus.register(queries);
        this.eventsBus.registerSagas(sagas);
        onStart();
    }
}

export const useCqrs = Container.get(CqrsModule);
export default useCqrs;
