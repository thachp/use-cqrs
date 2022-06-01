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
exports.ExampleValidationQueryHandler = exports.ExampleValidationQuery = void 0;
const class_validator_1 = require("class-validator");
const __1 = require("../../..");
const matchtext_validator_1 = require("../validators/matchtext.validator");
class ExampleValidationQuery {
    constructor(skip = 0, take = 1, text = "") {
        this.skip = skip;
        this.take = take;
        this.text = text;
    }
}
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], ExampleValidationQuery.prototype, "skip", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Max)(10),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], ExampleValidationQuery.prototype, "take", void 0);
__decorate([
    (0, class_validator_1.Validate)(matchtext_validator_1.MatchTextValidator),
    __metadata("design:type", String)
], ExampleValidationQuery.prototype, "text", void 0);
exports.ExampleValidationQuery = ExampleValidationQuery;
let ExampleValidationQueryHandler = class ExampleValidationQueryHandler {
    handle(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const { skip, take } = query;
            console.log("examplevalidation-query", skip, take);
            // sample data
            const data = [
                {
                    id: "1",
                    name: "John Doe"
                }
            ];
            if (take > 1) {
                data.push({
                    id: "2",
                    name: "Sally Doe"
                });
            }
            // return the data
            return {
                data,
                errors: []
            };
        });
    }
};
ExampleValidationQueryHandler = __decorate([
    (0, __1.Injectable)(ExampleValidationQuery)
], ExampleValidationQueryHandler);
exports.ExampleValidationQueryHandler = ExampleValidationQueryHandler;
