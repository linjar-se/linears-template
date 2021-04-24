const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const PreloadWebpackPlugin = require("@vue/preload-webpack-plugin");

module.exports = {
    mode: "development",
    output: { publicPath: "/" },
    entry: ["react-hot-loader/patch", "./src/index.tsx"],
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/i,
                use: "babel-loader",
                include: path.resolve(__dirname, "src"),
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader", "postcss-loader"],
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: "asset/resource",
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf|)$/,
                type: "asset/resource",
            },
            {
                test: /\.svg$/,
                use: {
                    loader: "@svgr/webpack",
                    options: {
                        svgoConfig: {
                            plugins: {
                                removeViewBox: false,
                            },
                        },
                    },
                },
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: "./public",
                    to: "./",
                    globOptions: {
                        ignore: ["**/index.html"],
                    },
                },
            ],
        }),
        new HtmlWebpackPlugin({
            template: "public/index.html",
        }),
        new ForkTsCheckerWebpackPlugin({
            async: false,
            eslint: {
                files: "./src/**/*.{ts,tsx,js,jsx}",
            },
        }),
        new PreloadWebpackPlugin({
            rel: "preload",
            as: "font",
            include: "allAssets",
            fileWhitelist: [/\.(woff2?|jeot|ttf|otf)(\?.*)?$/i],
        }),
    ],
    devtool: "inline-source-map",
    devServer: {
        contentBase: path.join(__dirname, "build"),
        historyApiFallback: true,
        port: 4000,
        hot: true,
    },
};
