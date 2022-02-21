import { ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { Service as Injectable } from "typedi";

import { ExampleService } from "../services/example.service.";

@ValidatorConstraint({ name: "MatchTextValidator", async: false })
@Injectable()
export class MatchTextValidator implements ValidatorConstraintInterface {
    constructor(private readonly exampleService: ExampleService) {}

    validate(text: string) {
        return this.exampleService.doSomething() === text;
    }

    defaultMessage() {
        return "Text does not match!";
    }
}
