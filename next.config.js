const withTM = require("next-transpile-modules");

module.exports = withTM({
  transpileModules: ["@bluechilli/bcstatemachine", "@bluechilli/appear"]
});
