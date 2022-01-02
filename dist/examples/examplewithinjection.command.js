"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
exports.ExampleWithInjectionCommandHandler = exports.ExampleWithInjectionCommand = void 0;
const class_validator_1 = require("class-validator");
const typedi_1 = require("typedi");
let ExampleInjectedService = class ExampleInjectedService {
    printMessage() {
        console.log("I am alive!");
    }
};
ExampleInjectedService = __decorate([
    (0, typedi_1.Service)()
], ExampleInjectedService);
class ExampleWithInjectionCommand {
    constructor(hello, name) {
        this.hello = hello;
        this.name = name;
    }
}
__decorate([
    (0, class_validator_1.Contains)("hello"),
    __metadata("design:type", String)
], ExampleWithInjectionCommand.prototype, "hello", void 0);
__decorate([
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(5),
    __metadata("design:type", String)
], ExampleWithInjectionCommand.prototype, "name", void 0);
exports.ExampleWithInjectionCommand = ExampleWithInjectionCommand;
let ExampleWithInjectionCommandHandler = class ExampleWithInjectionCommandHandler {
    constructor(exampleInjectedService) {
        this.exampleInjectedService = exampleInjectedService;
    }
    execute(command) {
        return __awaiter(this, void 0, void 0, function* () {
            const { hello, name } = command;
            // call injected service
            this.exampleInjectedService.printMessage();
            // log
            console.log("example-command-withinjection", hello, name);
            return {
                loading: false
            };
        });
    }
};
ExampleWithInjectionCommandHandler = __decorate([
    (0, typedi_1.Service)(ExampleWithInjectionCommand.name),
    __metadata("design:paramtypes", [ExampleInjectedService])
], ExampleWithInjectionCommandHandler);
exports.ExampleWithInjectionCommandHandler = ExampleWithInjectionCommandHandler;
