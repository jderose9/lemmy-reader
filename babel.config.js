module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      require.resolve("expo-router/babel"),
      ["module-resolver", {
        "alias": {
          "@api": "./api",
          "@app": "./app",
          "@components": "./components",
          "@context": "./context",
          "@models": "./models",
          "@assets": "./assets",
          "@services": "./services"
        },
        "extensions": [
          ".js",
          ".jsx",
          ".ts",
          ".tsx",
        ]
      }],
    ],
  };
};
