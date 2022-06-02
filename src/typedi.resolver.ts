import { useContainer } from "class-validator";
import { IResolver } from "mediatr-ts";
import { Container } from "typedi";

// eslint-disable-next-line react-hooks/rules-of-hooks
useContainer(Container, { fallbackOnErrors: true });

export class TypeDiResolver implements IResolver {
    resolve<T>(name: string): T {
        return Container.get(name);
    }
    add(id: string, type: any): void {
        Container.set({ id, type });
    }
    remove(id: string): void {
        Container.remove(id);
    }
    clear(): void {
        Container.reset();
    }
}

export default TypeDiResolver;
