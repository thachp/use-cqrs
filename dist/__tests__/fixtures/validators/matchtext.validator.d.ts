import { ValidatorConstraintInterface } from "class-validator";
import { ExampleService } from "../services/example.service.";
export declare class MatchTextValidator implements ValidatorConstraintInterface {
    private readonly exampleService;
    constructor(exampleService: ExampleService);
    validate(text: string): boolean;
    defaultMessage(): string;
}
