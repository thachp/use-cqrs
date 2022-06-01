import { IResolver } from "mediatr-ts";
export declare class TypeDiResolver implements IResolver {
    resolve<T>(name: string): T;
    add(id: string, type: any): void;
    remove(id: string): void;
    clear(): void;
}
export default TypeDiResolver;
