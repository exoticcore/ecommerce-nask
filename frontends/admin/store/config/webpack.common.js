const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    resolve: {
        extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    },
    module: {
        rules: [
            {
                test: /\.m?js/,
                type: "javascript/auto",
                resolve: {
                    fullySpecified: false,
                },
            },
            {
                test: /\.(ts|tsx|js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './public/index.html'
        })
    ]
};
