module.exports = {
    setupFilesAfterEnv: ["./jest.setup.js"],
    moduleNameMapper: {
        "^@components(.*)$": "<rootDir>/components$1",
    },
    verbose: true
};