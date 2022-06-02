![build](https://github.com/thachp/use-cqrs/actions/workflows/main.yml/badge.svg)
![download](https://img.shields.io/npm/dw/use-cqrs)

# useCQRS

useCQRS is a React hooks library for applying Command and Query Responsibility Segregation (CQRS) design pattern and Single Responsibility Principle (SRP) in frontend development.

useCQRS contains:

-   Essential classes for defining CQRS types and handlers
-   Dependency Injection with Type-DI to help build testable applications
-   Attribute validators with class-validator
-   Two react hooks for use in React components: useCommand() and useQuery(). Use the useCommand() hook to do something. Use the useQuery() hook to ask for something.

## Motivations

This package will be considered a success if the following goals are achieved:

1. Frontend and backend developers use the same domain-driven verbs and nouns in their layers. Using ubiquitous language links to task-based thinking, which in the long-term benefits everyone in producing maintainable interfaces (UI / API) and improving user experiences (Khorikov, 2018).

2. Apply Single Responsibility Principle (SRP) in developing React components. SRP is one of the SOLID principles, which states that a "module should be responsible to one, and only one, actor (Martin, 2017)".

    - A component should use either the useCommand() or useQuery hook but never both hooks.

## Installing

Using npm or yarn

```bash
npm install use-cqrs or yarn add use-cqrs
```

Add these settings to your tsconfig.json

```json
{
    "compilerOptions": {
        "experimentalDecorators": true,
        "emitDecoratorMetadata": true
    }
}
```

## Getting started

### Define an Event and the EventHandler

```typescript
import { IEvent, IEventHandler, Injectable } from "use-cqrs";

export class ExampleEvent implements IEvent {
    constructor(public readonly hello: string, public readonly name: string) {}
}

@Injectable(ExampleEvent)
export class ExampleEventHandler implements IEventHandler<ExampleEvent> {
    constructor() {}

    async handle(event: ExampleEvent) {
        const { hello, name } = event;

        console.log("example-event", hello, name);
    }
}
```

### Define a Query and the QueryHandler

For more query examples, checkout the queries directory in [\_\_tests\_\_/fixtures/queries](https://github.com/thachp/use-cqrs/tree/main/src/__tests__/fixtures/queries)

```typescript
import { IQuery, IQueryHandler, Injectable } from "use-cqrs";
import { IsNumber, Max, Min } from "class-validator";

export class ExampleQuery implements IQuery {
    // use-CQRS support attribute validation using class-validator
    @Min(0)
    public readonly skip: number;

    @Max(10)
    @Min(0)
    public readonly take: number;

    constructor(skip: number = 0, take: number = 1) {
        this.skip = skip;
        this.take = take;
    }
}

// Use the @Injectable decorator to register the handler class into Type-DI container.
@Injectable(ExampleQuery)
export class ExampleQueryHandler implements IQueryHandler<ExampleQuery> {
    // ExampleModel is injectable
    constructor(public readonly exampleModel: ExampleModel) {}

    // business logic here
    async handle(query: ExampleQuery) {
        const { skip, take } = query;
        // business logic
    }
}
```

### Define a Command, the CommandHandler, and publish event(s)

For more command examples, checkout the command directory in [\_\_tests\_\_/fixtures/commands](https://github.com/thachp/use-cqrs/tree/main/src/__tests__/fixtures/commands)

```typescript
import { ICommand, ICommandHandler, Injectable, EventPublisher } from "use-cqrs";

export class ExampleCommand implements ICommand {
    constructor(public readonly hello: string, public readonly name: string) {}
}

@Injectable(ExampleCommand)
export class ExampleCommandHandler implements ICommandHandler<ExampleCommand> {
    constructor(private readonly _eventBus: EventPublisher) {}

    async handle(command: ExampleCommand) {
        const { hello, name } = command;

        console.log("example-command", hello, name);

        // single event
        this._eventBus.publish(new ExampleEvent());

        // multiple events
        // this._eventBus.publishAll([new ExampleEvent(), new OtherEvent()]);
    }
}
```

Ask something with useQuery()

```typescript
// setup, invoke, and destructure
const [{ data, error, loading }, process] = useQuery<DataType, ErrorType>(new ExampleQuery(value));

// optionally, invoke process to lazy load with different parameters
process(new ExampleQuery(newValue));
```

Do something with useCommand()

```typescript
// setup and destructure
const [{ error, loading, done }, execute] = useCommand<ErrorType>();

// invoke execute to do something
execute(new ExampleCommand(value));
```

## How it works?

![arch](https://user-images.githubusercontent.com/1495371/171541707-4337418d-b57b-4aec-9bef-4069f6f2632f.png)

## Examples

Each query, command, and event must have its corresponding handler. Below are examples of classes for a query and its handler.
You may use validation decorators to perform field validation and inject classes into the handler.

```typescript
import { IQuery, IQueryHandler, Injectable } from "use-cqrs";
import { IsNumber, Max, Min } from "class-validator";

export interface ExampleQueryDataItem {
    id: string;
    name: string;
}

// Support dependency injection
// AnyGraphQLClient is injected into ExampleModel

@Injectable()
class ExampleModel {
    constructor(public readonly client: AnyGraphQLClient);

    querySomething() {
        // client.query(...)
    }
}

// Support field validation
// Skip must have a minimum value of 0
// Take must have a minimum value of 0 and max at 10
export class ExampleValidationQuery implements IQuery {
    @Min(0)
    public readonly skip: number;

    @Max(10)
    @Min(0)
    public readonly take: number;

    constructor(skip: number = 0, take: number = 1) {
        this.skip = skip;
        this.take = take;
    }
}

// Register the handler with the Injectable decorator so that useCQRS know to map ExampleValidationQuery to ExampleValidationQueryHandler
@Injectable(ExampleValidationQuery)
export class ExampleValidationQueryHandler implements IQueryHandler<ExampleValidationQuery> {
    // ExampleModel is injectable
    constructor(public readonly exampleModel: ExampleModel) {}

    // business logic here
    async handle(query: ExampleValidationQuery) {
        const { skip, take } = query;

        // invoke injected service class
        this.exampleModel.querySomething();

        // samples
        const data: Array<ExampleQueryDataItem> = [
            {
                id: "1",
                name: "John Doe"
            }
        ];

        if (take > 1) {
            data.push({
                id: "2",
                name: "Sally Doe"
            });
        }

        return data;
    }
}
```

Use the useQuery() hook to dispatch the Query message, which will be consumed by the QueryHandler

In this example, ExampleValidationQueryHandler will be called when the component first render and when the user clicks on the More button.

```typescript
import { useQuery, Injectable } from "use-cqrs";
import { ExampleValidationQuery } from "../examplevalidation.query";

export const ExampleQueryComponent = () => {
    // use the useQuery hook by passing an instant of the ExampleValidation object.
    // Deconstruct `process` for when the user click on the More button.
    const [{ loading, errors, data }, process] = useQuery<any, any>(new ExampleValidationQuery(0, 1));

    if (errors && errors.length > 0) {
        return <div>Errors...</div>;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    // on button clicked, invoke process() with new object constructor values
    return (
        <div>
            <h1>{ExampleQueryComponent.name}</h1>
            <button id="more" onClick={() => process(new ExampleValidationQuery(0, 2))}>
                More
            </button>
            <ul>
                {data.map((item) => (
                    <li key={item.id}>
                        {item.id} - {item.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};
```

## Contributing

-   Do Fork and Pull to the develop branch
-   Do apply TDD approach to development
-   Do use camelCase
-   Do not override Prettier configuration

## Dependencies

useCQRS is dependent on the following modules:

-   [ReactJS](https://github.com/facebook/react) A declarative, efficient, and flexible JavaScript library for building user interfaces
-   [TypeDI](https://github.com/typestack/typedi) Simple yet powerful dependency injection tool for JavaScript and TypeScript
-   [Class-validator](https://github.com/typestack/class-validator) Decorator-based property validation for classes
-   [Mediatr-ts](https://github.com/m4ss1m0g/mediatr-ts) Porting to typescript of the famous MediatR for C#

## References

-   Dominguez, J., Melnik, G., Simonazzi, F., Subramanian, M., & Betts, D. (2012). Exploring CQRS and Event Sourcing (Microsoft patterns & practices) (1st ed.). Microsoft.
-   Fowler, M. (2011, July 14). bliki: CQRS. Martinfowler.Com. Retrieved January 3, 2022, from https://martinfowler.com/bliki/CQRS.html
-   Garofolo, E. (2020). Practical Microservices: Build Event-Driven Architectures with Event Sourcing and CQRS (1st ed.). Pragmatic Bookshelf.
-   Greg Young - CQRS and Event Sourcing - Code on the Beach 2014. (2014, September 8). [Video]. YouTube. https://www.youtube.com/watch?v=JHGkaShoyNs
-   Martin, R. C., O’Brien, T., & Books, U. (2017). Clean Architecture: A Craftsman’s Guide to Software Structure and Design. Upfront Books.
-   Khorikov, V. (2018, October 18). CQRS in Practice. Pluralsight.com. Retrieved January 3, 2022, from https://www.pluralsight.com/courses/cqrs-in-practice?aid=7010a000001xAKZAA2

## License

useCQRS is [MIT](https://github.com/thachp/use-cqrs/blob/main/LICENSE) licensed.
