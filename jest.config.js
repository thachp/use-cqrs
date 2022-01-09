/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: "ts-jest",
    testPathIgnorePatterns: ["/node_modules/", "/dist/", "/fixtures/"],
    testEnvironment: "jsdom"
};
