const {
  shareAll,
  withModuleFederationPlugin,
} = require("@angular-architects/module-federation/webpack");

module.exports = withModuleFederationPlugin({
  name: "mfBase",

  exposes: {
    "./module": "./src/app/features/feature.module.ts",
  },

  shared: {
    ...shareAll({
      singleton: false,
      strictVersion: false,
      requiredVersion: "auto",
    }),
  },
});
