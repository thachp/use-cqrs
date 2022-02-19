import * as React from "react";
import { Inject, Service as Injectable } from "typedi";

import { CommandBus } from "../../cqrs/command-bus";
import { ExampleCommand } from "./commands/example.command";

@Injectable()
export class InjectableExample extends React.Component {
    @Inject()
    private readonly commandBus: CommandBus;

    doSomething = () => {
        this.commandBus.execute(new ExampleCommand("Hello", "World"));
    };

    render() {
        return <button onClick={() => this.doSomething()}>Something</button>;
    }
}
