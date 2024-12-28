const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');

const deps = require("../package.json").dependencies;

const devConfig = {
    mode: 'development',
    output: {
        publicPath: 'http://localhost:9001/'
    },
    devServer: {
        port: 9001,
        historyApiFallback: true
    },
    plugins: [
        new ModuleFederationPlugin({
            name: "dashboard",
            filename: "remoteEntry.js",
            remotes: {
                container: 'container@http://localhost:9000/remoteEntry.js',
                store: 'store@http://localhost:9004/remoteEntry.js',
            },
            exposes: {
                "./DashboardApp": './src/bootstrap',
            },
            shared: {
                ...deps,
            },
        }),
    ]
};

module.exports = merge(commonConfig, devConfig);