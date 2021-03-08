const { declare } = require("@babel/helper-plugin-utils");

module.exports = declare((api) => {
  api.assertVersion(7);

  const commonBuild = api.cache.using(() => false);

  return {
    presets: [
      [
        "@babel/env",
        {
          modules: "commonjs",
        },
      ],
      "@babel/typescript",
    ],
    plugins: [
      [
        "@babel/plugin-transform-runtime",
        {
          useESModules: true,
        },
      ],
    ],
  };
});
