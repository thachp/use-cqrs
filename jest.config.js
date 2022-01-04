/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: "ts-jest",
    testPathIgnorePatterns: ["**.spec.js", "**.spec.d.ts"],
    testEnvironment: "jsdom"
};
