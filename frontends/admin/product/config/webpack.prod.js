const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const domain = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
    mode: 'production',
    output: {
        filename: '[name].[contenthash].js',
        publicPath: '/product/latest/'
    },
    plugins: [
        new ModuleFederationPlugin({
            name: "product",
            filename: "remoteEntry.js",
            remotes: {
                main: `container@http://${domain}/remoteEntry.js`,
                store: `store@http://${domain}/store/latest/remoteEntry.js`,
                media: `media@http://${domain}/remoteEntry.js`
            },
            shared: packageJson.dependencies,
            exposes: {
                "./ProductApp": "./src/bootloader",
            },
            shared: require("../package.json").dependencies,
        }),
    ]
};

module.exports = merge(commonConfig, prodConfig);