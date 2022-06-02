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
exports.ExampleWithValidationQueryHandler = exports.ExampleValidationInjectionQuery = void 0;
const class_validator_1 = require("class-validator");
const __1 = require("../../..");
let ExampleService = class ExampleService {
    getRecords() {
        return [
            { id: "1", name: "John Doe" },
            { id: "2", name: "Jane Doe" },
            { id: "3", name: "Joe Doe" }
        ];
    }
};
ExampleService = __decorate([
    (0, __1.Injectable)()
], ExampleService);
class ExampleValidationInjectionQuery {
    constructor(skip = 0, take = 5) {
        this.skip = skip;
        this.take = take;
    }
}
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], ExampleValidationInjectionQuery.prototype, "skip", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Max)(10),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], ExampleValidationInjectionQuery.prototype, "take", void 0);
exports.ExampleValidationInjectionQuery = ExampleValidationInjectionQuery;
let ExampleWithValidationQueryHandler = class ExampleWithValidationQueryHandler {
    constructor(exampleService) {
        this.exampleService = exampleService;
    }
    handle(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const { skip, take } = query;
            // call injected service
            const records = this.exampleService.getRecords();
            console.log("example-query-withvalidationinjection", skip, take);
            // return the data
            return { skip, take, records };
        });
    }
};
ExampleWithValidationQueryHandler = __decorate([
    (0, __1.Injectable)(ExampleValidationInjectionQuery),
    __metadata("design:paramtypes", [ExampleService])
], ExampleWithValidationQueryHandler);
exports.ExampleWithValidationQueryHandler = ExampleWithValidationQueryHandler;
