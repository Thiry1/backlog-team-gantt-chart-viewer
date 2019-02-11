const webpack = require("webpack");
const path = require("path");

module.exports = {
    plugins: [
        new webpack.DefinePlugin({
            "buildEnv": JSON.stringify("browser"),
        }),
    ],
    entry: {
        index: ["@babel/polyfill", path.join(__dirname, "src/browser.tsx")],
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: "bundle.js",
    },
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx", ".scss"],
    },
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: [/__tests__/, /__mocks__/, /node_modules/],
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: ["@babel/preset-env"],
                            cacheDirectory: true,
                        },
                    },
                    {
                        loader: "ts-loader",
                    },
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: "style-loader",
                    },
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                            camelCase: true,
                            importLoaders: 2,
                            localIdentName: "___[local]___[hash:base64:5]",
                        },
                    },
                    {
                        loader: "sass-loader",
                    },
                ],
                include: [path.join(__dirname, "./src/")],
            }
        ],
    }
};
