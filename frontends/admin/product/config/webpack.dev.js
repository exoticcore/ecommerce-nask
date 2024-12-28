const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const deps = require("../package.json").dependencies;

const devConfig = {
    mode: 'development',
    output: {
        publicPath: 'http://localhost:9003/'
    },
    devServer: {
        port: 9003,
        historyApiFallback: true
    },
    plugins: [
        new ModuleFederationPlugin({
            name: "product",
            filename: "remoteEntry.js",
            remotes: {
                main: 'container@http://localhost:9000/remoteEntry.js',
                store: 'store@http://localhost:9004/remoteEntry.js',
                media: `media@http://localhost:9005/remoteEntry.js`
            },
            exposes: {
                "./ProductApp": "./src/bootloader",
            },
            shared: {
                ...deps,
            },
        })
    ]
};

module.exports = merge(commonConfig, devConfig);