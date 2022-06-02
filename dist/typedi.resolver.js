"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeDiResolver = void 0;
const class_validator_1 = require("class-validator");
const typedi_1 = require("typedi");
// eslint-disable-next-line react-hooks/rules-of-hooks
(0, class_validator_1.useContainer)(typedi_1.Container, { fallbackOnErrors: true });
class TypeDiResolver {
    resolve(name) {
        return typedi_1.Container.get(name);
    }
    add(id, type) {
        typedi_1.Container.set({ id, type });
    }
    remove(id) {
        typedi_1.Container.remove(id);
    }
    clear() {
        typedi_1.Container.reset();
    }
}
exports.TypeDiResolver = TypeDiResolver;
exports.default = TypeDiResolver;
