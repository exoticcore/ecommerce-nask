const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');
const webpack = require('webpack');

const deps = require("../package.json").dependencies;

const devConfig = {
    mode: 'development',
    output: {
        publicPath: 'http://localhost:9000/'
    },
    devServer: {
        port: 9000,
        historyApiFallback: true
    },
    plugins: [
        new ModuleFederationPlugin({
            name: "container",
            filename: "remoteEntry.js",
            remotes: {
                auth: `auth@http://localhost:9002/remoteEntry.js`,
                dashboard: `dashboard@http://localhost:9001/remoteEntry.js`,
                product: `product@http://localhost:9003/remoteEntry.js`,
                store: `store@http://localhost:9004/remoteEntry.js`,
                media: `media@http://localhost:9005/remoteEntry.js`
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
    ]
};

module.exports = merge(commonConfig, devConfig);