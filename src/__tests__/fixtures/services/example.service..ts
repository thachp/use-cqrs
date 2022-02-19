import { Service as Injectable } from "typedi";

@Injectable()
export class ExampleService {
    constructor() {}

    public doSomething() {
        return "Hello world!";
    }
}
