import { useCommand } from "../../../command.hook";
import { ExampleCommand } from "../example.command";
import { ExampleWithInjectionCommand } from "../examplewithinjection.command";
import { ExampleWithValidationCommand } from "../examplewithvalidation.command";
import { ExampleWithValidationInjectionCommand } from "../examplewithvalidationinjection.command";

describe("Test Command Hook", () => {
    test("should pass, given the command has no validation nor services injection", async () => {
        // arrange
        const doExample = useCommand(new ExampleCommand("hello", "world"));

        // act
        const { loading, errors } = await doExample();

        // assert
        expect(doExample).toBeDefined();
        expect(loading).toBe(false);
        expect(errors).toHaveLength(0);
    });

    test("should pass, given the command has validation", async () => {
        // arrange
        const doExample = useCommand(new ExampleWithValidationCommand("wazzup!", "1"));

        // act
        const { loading, errors } = await doExample();

        // assert
        expect(doExample).toBeDefined();
        expect(loading).toBe(false);
        expect(errors).toHaveLength(2);
    });

    test("should pass, given the command has service injection", async () => {
        // arrange
        const doExample = useCommand(new ExampleWithInjectionCommand("Hello", "Injection"));

        // act
        const { loading, errors } = await doExample();

        // assert
        expect(doExample).toBeDefined();
        expect(loading).toBe(false);
        expect(errors).toHaveLength(2);
    });

    test("should pass, given the command has validation and service injection", async () => {
        // arrange
        const doExample = useCommand(new ExampleWithValidationInjectionCommand("Hello", "Injection"));

        // act
        const { loading, errors } = await doExample();

        // assert
        expect(doExample).toBeDefined();
        expect(loading).toBe(false);
        expect(errors).toHaveLength(2);
    });
});
