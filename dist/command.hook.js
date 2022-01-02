"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const typedi_1 = require("typedi");
const cqrs_1 = require("./cqrs");
/**
 * The command object is used to send a command to the command bus.
 * @param command
 * @returns CommandResults
 */
const useCommand = (command, validatorOptions) => {
    const commandBus = typedi_1.default.get(cqrs_1.CommandBus);
    // lazy call the success and error handlers
    const execute = () => __awaiter(void 0, void 0, void 0, function* () {
        const errors = yield (0, class_validator_1.validate)(command, validatorOptions);
        if (errors.length > 0) {
            return {
                loading: false,
                errors: errors
            };
        }
        // execute the command
        return yield commandBus.execute(command);
    });
    return execute;
};
exports.default = useCommand;
