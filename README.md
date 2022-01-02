# use-cqrs
USE-CQRS is a React hooks library for applying CQRS design patterns and Single Responsiblity Principle (SRP) in front-end development. It consists of three react hooks: useCommand, useQuery, and useEvent(). 

- The useCommand() hook tells your server to do something.  
- The useQuery() hook gets something from the server.  
- The useEvent() hook reacts to what the server has done.

### Goals & Intentions
This package will be considered a success if the following goals are achieved.  

1. More ubiquitous language between front-end and back-end development; front-end and back-end developers use the same domain-driven verbs and nouns in all layers on their application. Using ubiquitous language links to task-based thinking, which in the long-term benefits everyone in producing user-friendly interfaces and user experiences. 

    Avoid using HTTP verbs; get, post, put, delete, and patch to describe user actions. Use terms like “begin “or “complete” a “questionnaire“ if the web application is intended for users to submit a questionnaire.

2. Apply Single Responsible Principle (SRP) in developing React components. SRP is one of the SOLID principles, which dictate that a class must only do one thing and do it well.   A React component using CQRS must, upon a user’s action, tell the server to do something or get something from the server, but never both. 
  
     - A component must use either the useCommand() or useQuery hook but never both hooks.  
     - A component may use multiple useEvent() in one component, but keep the count minimal.

3. For more front-end developers to consider CQRS patterns and domain design principles in their frontend application, because its benefits are great.  Frontend application too can achieve simplicity!

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

Write two classes for Query and QueryHandler classes. Each query, command, and event must have its corresponding handler.

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
export class ExampleValidationQuery implements IQuery {
    @IsNumber()
    @Min(0)
    public readonly skip: number;

    @IsNumber()
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

constructor(public readonly exampleInjectedService: ExampleValidationInjectedService) {}

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

    // call the useQuery hook and lazy query with process
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

### Dependencies
useCQRS is dependent on the following main modules:

- [TypeDI](https://github.com/typestack/typedi) Simple yet powerful dependency injection tool for JavaScript and TypeScript.
- [Class-validator](https://github.com/typestack/class-validator) Decorator-based property validation for classes.
- [RxJS](https://github.com/ReactiveX/rxjs) A reactive programming library for JavaScript

### References
TBD

### Credits
Initially, the project forks from the [@nestjs/cqrs](https://github.com/nestjs/cqrs) module for NestJS Framework server-side development. The code has been repurposed to work on the frontend in ReactJS hooks.
Thanks @[Kamil](https://github.com/kamilmysliwiec)
