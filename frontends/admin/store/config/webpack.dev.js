const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const deps = require("../package.json").dependencies;

const devConfig = {
    mode: 'development',
    output: {
        publicPath: 'http://localhost:9004/'
    },
    devServer: {
        port: 9004,
        historyApiFallback: true
    },
    plugins: [
        new ModuleFederationPlugin({
            name: "store",
            filename: "remoteEntry.js",
            remotes: {
                container: 'container@http://localhost:9000/container/remoteEntry.js'
            },
            exposes: {
                './Store': './src/store'
            },
            shared: {
                ...deps,
            },
        })
    ]
};

module.exports = merge(commonConfig, devConfig);