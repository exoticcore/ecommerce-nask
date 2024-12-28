const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');

const deps = require('../package.json').dependencies;
const domain = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
    mode: 'production',
    output: {
        filename: '[name].[contenthash].js',
        publicPath: '/store/latest/'
    },
    plugins: [
        new ModuleFederationPlugin({
            name: "store",
            filename: "remoteEntry.js",
            remotes: {
                container: `container@http://${domain}/remoteEntry.js`,
            },
            exposes: {
                './Store': './src/store',
            },
            shared: {
                ...deps,
            },
        }),
    ]
};

module.exports = merge(commonConfig, prodConfig);