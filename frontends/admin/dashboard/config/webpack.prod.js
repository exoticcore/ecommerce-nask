const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const deps = require('../package.json').dependencies;
const domain = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
    mode: 'production',
    output: {
        filename: '[name].[contenthash].js',
        publicPath: '/dashboard/latest/'
    },
    plugins: [
        new ModuleFederationPlugin({
            name: "dashboard",
            filename: "remoteEntry.js",
            remotes: {
                main: `container@http://${domain}/remoteEntry.js`,
                store: `store@http://${domain}/store/latest/remoteEntry.js`,
            },
            shared: packageJson.dependencies,
            exposes: {
                "./DashboardApp": './src/bootstrap',
            },
            shared: {
                ...deps,
            },
        }),
    ]
};

module.exports = merge(commonConfig, prodConfig);