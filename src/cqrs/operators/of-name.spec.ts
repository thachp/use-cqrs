import { IEvent } from "../interfaces";
import { nameOf } from "./of-name";

describe("operators/ofName", () => {
    class A implements IEvent {}
    class SubA extends A {}

    test("return constructor name", () => {
        expect(nameOf(A)).toBe("A");
        expect(nameOf(SubA)).toBe("SubA");
    });
});
