import "reflect-metadata";
import { ICommand } from "../interfaces/commands/command.interface";
/**
 * Decorator that marks a class as a Nest command handler. A command handler
 * handles commands (actions) executed by your application code.
 *
 * The decorated class must implement the `ICommandHandler` interface.
 *
 * @param command command *type* to be handled by this handler.
 *
 * @see https://docs.nestjs.com/recipes/cqrs#commands
 */
export declare const CommandHandler: (command: ICommand) => ClassDecorator;