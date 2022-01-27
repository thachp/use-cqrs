![build](https://github.com/thachp/use-cqrs/actions/workflows/main.yml/badge.svg)

# useCQRS

useCQRS is a React hooks library for applying Command and Query Responsibility Segregation (CQRS) design pattern and Single Responsibility Principle (SRP) in frontend development. It consists of three react hooks: useCommand(), useQuery(), and useEvent().

-   Use the useCommand() hook to do something.
-   Use the useQuery() hook to ask for something.
-   Use the useEvent() hook to react to what has been done.

## Motivations

This package will be considered a success if the following goals are achieved:

1. Frontend and backend developers use the same domain-driven verbs and nouns in their layers. Using ubiquitous language links to task-based thinking, which in the long-term benefits everyone in producing maintainable interfaces (UI / API) and improving user experiences (Khorikov, 2018).

2. Apply Single Responsibility Principle (SRP) in developing React components. SRP is one of the SOLID principles, which states that a "module should be responsible to one, and only one, actor (Martin, 2017)".

    - A component should use either the useCommand() or useQuery hook but never both hooks.
    - A component may use multiple useEvent() but keep the count minimal.

## Installing

Using npm

```bash
npm install use-cqrs
```

Using yarn

```bash
yarn add use-cqrs
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

```typescript
import { useCqrs } from "use-cqrs";

// register handlers on start
useCqrs.initialize({
    queries: [ExampleValidationQueryHandler],
    commands: [],
    events: [],
    sagas: []
});
```

Ask something with useQuery()

```typescript
// setup, invoke, and destructure
const [{ data, error, loading }, process] = useQuery<DataType, ErrorType>(new WhateverQuery(value));

// optionally, invoke process to lazy load with different parameters
process(new WhateverQuery(newValue));
```

Do something with useCommand()

```typescript
// setup and destructure
const [{ error, loading, done }, execute] = useCommand<ErrorType>();

// invoke execute to do something
execute(new WhateverCommand(value));
```

React to something with useEvent()

```typescript
// setup and destructure
const [{ data, error }, emit] = useEvent<DataType, ErrorType>(nameOf<WhateverChanged>());

// optionally, invoke emit to publish an event
emit(new SomethingChanged(value));
```

## How it works?

![arch](https://user-images.githubusercontent.com/1495371/147893504-42a50f72-293a-4dc0-bf29-3c5a568f36f6.png)

## Examples

Each query, command, and event must have its corresponding handler. Below are examples of classes for a query and its handler.
You may use validation decorators to perform field validation and inject classes into the handler.

```typescript
import { IQuery, IQueryHandler, Injectable, AggregateRoot } from "use-cqrs";
import { IsNumber, Max, Min } from "class-validator";

export interface ExampleQueryDataItem {
    id: string;
    name: string;
}

// Support dependency injection
// AnyGraphQLClient is injected into ExampleModel

@Injectable()
class ExampleModel extends AggregateRoot {
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

// Register the handler with Injectable and QueryHandler decorators,
// so that useCQRS know to map ExampleValidationQuery to ExampleValidationQueryHandler
@Injectable()
@QueryHandler(ExampleValidationQuery)
export class ExampleValidationQueryHandler implements IQueryHandler<ExampleValidationQuery> {
    // ExampleModel is injectable
    constructor(public readonly exampleModel: ExampleModel) {}

    // business logic here
    async process(query: ExampleValidationQuery) {
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
import { useQuery } from "use-cqrs";
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
-   [RxJS](https://github.com/ReactiveX/rxjs) A reactive programming library for JavaScript

## References

-   Dominguez, J., Melnik, G., Simonazzi, F., Subramanian, M., & Betts, D. (2012). Exploring CQRS and Event Sourcing (Microsoft patterns & practices) (1st ed.). Microsoft.
-   Fowler, M. (2011, July 14). bliki: CQRS. Martinfowler.Com. Retrieved January 3, 2022, from https://martinfowler.com/bliki/CQRS.html
-   Garofolo, E. (2020). Practical Microservices: Build Event-Driven Architectures with Event Sourcing and CQRS (1st ed.). Pragmatic Bookshelf.
-   Greg Young - CQRS and Event Sourcing - Code on the Beach 2014. (2014, September 8). [Video]. YouTube. https://www.youtube.com/watch?v=JHGkaShoyNs
-   Martin, R. C., O’Brien, T., & Books, U. (2017). Clean Architecture: A Craftsman’s Guide to Software Structure and Design. Upfront Books.
-   Khorikov, V. (2018, October 18). CQRS in Practice. Pluralsight.com. Retrieved January 3, 2022, from https://www.pluralsight.com/courses/cqrs-in-practice?aid=7010a000001xAKZAA2

-   Van Veen, B. (2019, March 1). Different kinds of service bus: command bus, service bus and query bus. Barry van Veen. Retrieved January 9, 2022, from https://barryvanveen.nl/articles/59-different-kinds-of-service-bus-command-bus-service-bus-and-query-bus

## Credits

Initially, the project forks from the [@nestjs/cqrs](https://github.com/nestjs/cqrs) module for NestJS Framework server-side development. The code has been repurposed to work on the client-side as ReactJS hooks.
Thanks [@kamilmysliwiec](https://github.com/kamilmysliwiec)

## License

useCQRS is [MIT](https://github.com/thachp/use-cqrs/blob/main/LICENSE) licensed.
