const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  remotes: {
    mfCatalogo: "http://localhost:4201/remoteEntry.js",
    mfEvaluacion: "http://localhost:4202/remoteEntry.js",
    mfUbicacion: "http://localhost:4203/remoteEntry.js",
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  }

});
