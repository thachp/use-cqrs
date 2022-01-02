"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const command_hook_1 = require("./command.hook");
const event_hook_1 = require("./event.hook");
const query_hook_1 = require("./query.hook");
// export the hooks
exports.default = {
    Service: typedi_1.Service,
    useCommand: command_hook_1.default,
    useEvent: event_hook_1.default,
    useQuery: query_hook_1.default
};
