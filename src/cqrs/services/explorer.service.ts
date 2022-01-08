import { Service as Injectable } from "typedi";

import {
    COMMAND_HANDLER_METADATA,
    EVENTS_HANDLER_METADATA,
    QUERY_HANDLER_METADATA,
    SAGA_METADATA,
} from "../decorators/constants";
import { ICommandHandler, IEvent, IEventHandler, IQueryHandler } from "../interfaces";
import { CqrsOptions } from "../interfaces/cqrs-options.interface";
import { Type } from "../interfaces/type.interface";

@Injectable()
export class ExplorerService<EventBase extends IEvent = IEvent> {
    constructor(private readonly modulesContainer: any) {}

    explore(): CqrsOptions {
        const modules = [...this.modulesContainer.values()];
        const commands = this.flatMap<ICommandHandler>(modules, (instance) =>
            this.filterProvider(instance, COMMAND_HANDLER_METADATA)
        );
        const queries = this.flatMap<IQueryHandler>(modules, (instance) =>
            this.filterProvider(instance, QUERY_HANDLER_METADATA)
        );
        const events = this.flatMap<IEventHandler<EventBase>>(modules, (instance) =>
            this.filterProvider(instance, EVENTS_HANDLER_METADATA)
        );
        const sagas = this.flatMap(modules, (instance) => this.filterProvider(instance, SAGA_METADATA));
        return { commands, queries, events, sagas };
    }

    flatMap<T>(modules: any[], callback: (instance: any) => Type<any> | undefined): Type<T>[] {
        const items = modules
            .map((module) => [...module.providers.values()].map(callback))
            .reduce((a, b) => a.concat(b), []);
        return items.filter((element) => !!element) as Type<T>[];
    }

    filterProvider(wrapper: any, metadataKey: string): Type<any> | undefined {
        const { instance } = wrapper;
        if (!instance) {
            return undefined;
        }
        return this.extractMetadata(instance, metadataKey);
    }

    extractMetadata(instance: Record<string, any>, metadataKey: string): Type<any> {
        if (!instance.constructor) {
            return;
        }
        const metadata = Reflect.getMetadata(metadataKey, instance.constructor);
        return metadata ? (instance.constructor as Type<any>) : undefined;
    }
}
