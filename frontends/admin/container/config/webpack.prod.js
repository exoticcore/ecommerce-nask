const webpack = require('webpack');
const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const deps = require("../package.json").dependencies;
const domain = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
    mode: 'production',
    output: {
        filename: '[name].[contenthash].js',
        publicPath: '/',
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'container',
            filename: "remoteEntry.js",
            remotes: {
                auth: `auth@http://${domain}/auth/latest/remoteEntry.js`,
                dashboard: `dashboard@http://${domain}/dashboard/latest/remoteEntry.js`,
                product: `product@http://${domain}/product/latest/remoteEntry.js`,
                store: `store@http://${domain}/store/latest/remoteEntry.js`,
                media: `media@http://${domain}/remoteEntry.js`
            },
            shared: packageJson.dependencies,
            exposes: {
                './Styles': './src/constant/styles.ts',
                './Config': './src/constant/config.ts',
                './index.scss': './src/index.scss',
                './ThImage': './src/assets/th.webp',
                './EnImage': './src/assets/en.png'
            },
            shared: {
                ...deps,
                react: {
                    singleton: true,
                    requiredVersion: deps.react,
                },
                "react-dom": {
                    singleton: true,
                    requiredVersion: deps["react-dom"],
                },
            },
        }),
        new webpack.DefinePlugin({
            'process.env.API_DOMAIN': JSON.stringify(process.env.API_DOMAIN),
            'process.env.MEDIA_DOMAIN': JSON.stringify(process.env.MEDIA_DOMAIN),
        }),
    ],
};

module.exports = merge(commonConfig, prodConfig);