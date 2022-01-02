import "reflect-metadata";

import { Container as IoC, Service as Injectable } from "typedi";

import { CommandHandlerNotFoundException } from "./exceptions/command-not-found.exception";
import { DefaultCommandPubSub } from "./helpers/default-command-pubsub";
import { ICommand, ICommandBus, ICommandHandler, ICommandPublisher } from "./interfaces";
import { Type } from "./interfaces/type.interface";
import { ObservableBus } from "./utils/observable-bus";

export type CommandHandlerType = Type<ICommandHandler<ICommand>>;

@Injectable()
export class CommandBus<CommandBase extends ICommand = ICommand>
    extends ObservableBus<CommandBase>
    implements ICommandBus<CommandBase>
{
    private _publisher: ICommandPublisher<CommandBase>;

    constructor() {
        super();
        this.useDefaultPublisher();
    }

    get publisher(): ICommandPublisher<CommandBase> {
        return this._publisher;
    }

    set publisher(_publisher: ICommandPublisher<CommandBase>) {
        this._publisher = _publisher;
    }

    execute<T extends CommandBase, R = any>(command: T): Promise<R> {
        const handler = IoC.get<ICommandHandler>(command.constructor.name);

        if (!handler) {
            throw new CommandHandlerNotFoundException(command.constructor.name);
        }

        this.subject$.next(command);
        return handler.execute(command);
    }

    private useDefaultPublisher() {
        this._publisher = new DefaultCommandPubSub<CommandBase>(this.subject$);
    }
}
