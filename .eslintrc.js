module.exports = {
    parser: "@babel/eslint-parser",
    env: {
        browser: true,
        node: true,
        es6: true
    },
    "extends": "google",
    "rules": {
        semi: ["error", "never"],
        quotes: ["error", "single"],
        indent: ["error", 4],
        "comma-dangle": 0,
        "require-jsdoc": 0,
        "arrow-parens": 0
    }
}
