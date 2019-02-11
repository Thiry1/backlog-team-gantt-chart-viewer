const webpack = require("webpack");
const path = require("path");

module.exports = {
    plugins: [
        new webpack.DefinePlugin({
            "buildEnv": JSON.stringify("browser"),
        }),
    ],
    entry: {
        index: path.join(__dirname, "src/index.ts"),
    },
    output: {
        path: path.join(__dirname, "dest"),
        filename: "[name].js",
    },
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx", ".scss"],
    },
    externals: {
        "react": "React",
        "react-dom": "ReactDOM",
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
