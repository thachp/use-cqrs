import { Service } from "typedi";
declare const _default: {
    Service: typeof Service;
    useCommand: <T>(command: import("./cqrs").ICommand, validatorOptions?: import("class-validator").ValidatorOptions) => Function;
    useEvent: (event: import("./cqrs").IEvent, callback: (event: import("./cqrs").IEvent) => void) => void;
    useQuery: (query: import("./cqrs").IQuery) => void;
};
export default _default;
