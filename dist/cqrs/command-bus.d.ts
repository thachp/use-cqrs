import "reflect-metadata";
import { ICommand, ICommandBus, ICommandHandler, ICommandPublisher } from "./interfaces";
import { Type } from "./interfaces/type.interface";
import { ObservableBus } from "./utils/observable-bus";
export declare type CommandHandlerType = Type<ICommandHandler<ICommand>>;
export declare class CommandBus<CommandBase extends ICommand = ICommand> extends ObservableBus<CommandBase> implements ICommandBus<CommandBase> {
    private handlers;
    private _publisher;
    private readonly moduleRef;
    constructor();
    get publisher(): ICommandPublisher<CommandBase>;
    set publisher(_publisher: ICommandPublisher<CommandBase>);
    execute<T extends CommandBase, R = any>(command: T): Promise<R>;
    bind<T extends CommandBase>(handler: ICommandHandler<T>, id: string): void;
    register(handlers?: CommandHandlerType[]): void;
    protected registerHandler(handler: CommandHandlerType): void;
    private getCommandId;
    private reflectCommandId;
    private useDefaultPublisher;
}
