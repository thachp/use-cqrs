# useCQRS
useCQRS is a React hooks library for applying CQRS design patterns and Single Responsiblity Principle (SRP) in frontend development. It consists of three react hooks: useCommand, useQuery, and useEvent(). 

- The useCommand() hook tells your server to do something.  
- The useQuery() hook gets something from the server.  
- The useEvent() hook reacts to what the server has done.

### Goals & Intentions
This package will be considered a success if the following goals are achieved.  

1. More ubiquitous language between frontend and backend development; frontend and backend developers use the same domain-driven verbs and nouns in all layers on their application. Using ubiquitous language links to task-based thinking, which in the long-term benefits everyone in producing maintainable interfaces and improving higher user experiences. 

    Avoid using HTTP verbs; get, post, put, delete, and patch to describe user actions. Use terms like “begin “or “complete” a “questionnaire“ if the web application is intended for users to submit a questionnaire.

2. Apply Single Responsible Principle (SRP) in developing React components. SRP is one of the SOLID principles, which dictate that a "module should be responsible to one, and only one, actor." A react component using CQRS must, upon a user’s action, tell the server to do something or get something from the server, but never both. 
  
     - A component must use either the useCommand() or useQuery hook but never both hooks.  
     - A component may use multiple useEvent() but keep the count minimal.

3. For more frontend developers to consider CQRS patterns and domain design principles in their frontend application, because its benefits are great.  Frontend applications,too, could achieve maintainability and simplicity!

### Installing

Using npm
```bash
npm install @thachp/use-cqrs
```

Using yarn
```bash
yarn add @thachp/use-cqrs
```


### How it works?
TBD


### Examples

Each query, command, and event must have its corresponding handler. Below are example of classes for query and its handler. Validation decorators can be used to perform field validation.  Services classes could also be injected into the handler.

```typescript
import { IQuery, IQueryHandler, Injectable } from "@thachp/use-cqrs";
import { IsNumber, Max, Min } from "class-validator";

export interface ExampleQueryDataItem {
    id: string;
    name: string;
}

// Support dependency injection
@Injectable()
class ExampleValidationInjectedService {
    printMessage() {
        console.log("I am alive!");
    }
}

// Support field validation
// Skip must have a minimum value of 0.
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

// Register the handler, so useCQRS know to map ExampleValidationQuery to ExampleValidationQueryHandler
@Injectable(ExampleValidationQuery.name)
export class ExampleValidationQueryHandler implements IQueryHandler<ExampleValidationQuery> {

    // ExampleValidationInjectedService is injectable
    constructor(public readonly exampleInjectedService: ExampleValidationInjectedService) {}

    // business logic here
    async process(query: ExampleValidationQuery) {
        const { skip, take } = query;

        // invoke injected service class
        this.exampleInjectedService.printMessage();

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

        // return the data
        return {
            loading: false,
            data,
            errors: []
        };
    }
}
```


Use the useQuery() hook to dispatch the Query message. 
In this case, ExampleValidationQueryHandler will be called when the component first rendered and when the user clicks on the More button.

```typescript
import { useQuery } from "@thachp/use-cqrs";
import {ExampleValidationQuery} from "../examplevalidation.query"

export const ExampleQueryComponent = () => {

    // use the useQuery hook by passing an instant of the ExampleValidation object.
    // Deconstruct `process` for when the user click on the More button. 
    const [{ loading, errors, data }, process] = useQuery<[{id: string, name: string}], any>(new ExampleValidationQuery(0, 1));

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

### Contributing
- Fork and Pull
- Use TDD approach to development
- Don't override Prettier 
- Use camelCase

### Dependencies
useCQRS is dependent on the following modules:

- [ReactJS](https://github.com/facebook/react) A declarative, efficient, and flexible JavaScript library for building user interfaces.
- [TypeDI](https://github.com/typestack/typedi) Simple yet powerful dependency injection tool for JavaScript and TypeScript.
- [Class-validator](https://github.com/typestack/class-validator) Decorator-based property validation for classes.
- [RxJS](https://github.com/ReactiveX/rxjs) A reactive programming library for JavaScript

### References
TBD

### Credits
Initially, the project forks from the [@nestjs/cqrs](https://github.com/nestjs/cqrs) module for NestJS Framework server-side development. The code has been repurposed to work on the frontend as ReactJS hooks.
Thanks @[Kamil](https://github.com/kamilmysliwiec)

### License
useCQRS is MIT licensed.
