const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');

const deps = require("../package.json").dependencies;

const devConfig = {
    mode: 'development',
    output: {
        publicPath: 'http://localhost:9002/'
    },
    devServer: {
        port: 9002,
        historyApiFallback: true
    },
    plugins: [
        new ModuleFederationPlugin({
            name: "auth",
            filename: "remoteEntry.js",
            remotes: {
                container: 'container@http://localhost:9000/remoteEntry.js',
                store: 'store@http://localhost:9004/remoteEntry.js',
            },
            exposes: {
                './AuthApp': './src/bootstrap',
            },
            shared: {
                ...deps,
            },
        }),
    ]
};

module.exports = merge(commonConfig, devConfig);