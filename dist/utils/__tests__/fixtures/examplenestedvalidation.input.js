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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExampleNestedValidationInput = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const examplevalidation_input_1 = require("./examplevalidation.input");
class ExampleNestedValidationInput {
    constructor(example, command) {
        this.example = example;
        this.command = command;
    }
}
__decorate([
    (0, class_validator_1.Contains)("example"),
    __metadata("design:type", String)
], ExampleNestedValidationInput.prototype, "example", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => examplevalidation_input_1.ExampleValidationInput),
    __metadata("design:type", examplevalidation_input_1.ExampleValidationInput)
], ExampleNestedValidationInput.prototype, "command", void 0);
exports.ExampleNestedValidationInput = ExampleNestedValidationInput;
exports.default = ExampleNestedValidationInput;
