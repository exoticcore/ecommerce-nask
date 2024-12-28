const HtmlWebPackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const webpack = require("webpack");

module.exports = {
    resolve: {
        extensions: [".tsx", ".ts", ".vue", ".jsx", ".js", ".json"],
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader",
            },
            {
                test: /\.tsx?$/,
                use: [
                    "babel-loader",
                    {
                        loader: "ts-loader",
                        options: {
                            transpileOnly: true,
                            appendTsSuffixTo: ["\\.vue$"],
                            happyPackMode: true,
                        },
                    },
                ],
            },
            {
                test: /\.(css|s[ac]ss)$/i,
                use: ["style-loader", "css-loader", "postcss-loader"],
            },
        ],
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebPackPlugin({
            template: './public/index.html'
        }),
        new webpack.DefinePlugin({
            __VUE_OPTIONS_API__: true,
            __VUE_PROD_DEVTOOLS__: false
        })
    ]
};