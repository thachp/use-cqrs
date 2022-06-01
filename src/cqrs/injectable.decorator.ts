import { RequestHandler } from "mediatr-ts";
import { Service, ServiceOptions } from "typedi";

export function Injectable(token?: any, serviceOptions?: ServiceOptions) {
    const serviceFn = Service(serviceOptions);
    let requestHandlerFn = token ? RequestHandler(token) : undefined;

    return function (target: any) {
        serviceFn(target);
        if (requestHandlerFn) {
            requestHandlerFn(target);
        }
    };
}
