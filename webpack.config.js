const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require("copy-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const ESLintPlugin = require('eslint-webpack-plugin')
const path = require('path')

module.exports = (env, argv) => {

    const isProd = argv.mode === 'production'
    const isDev = !isProd

    const fileName = ext => isProd ? `[name].[contenthash].bundle.${ext}` : `[name].bundle.${ext}`
    const plugins = () => {
        const base = [
            new HtmlWebpackPlugin({
                template: './index.html'
            }),
            new CopyPlugin({
                patterns: [
                    {
                        from: path.resolve(__dirname, 'src', 'favicon.ico'),
                        to: path.resolve(__dirname, 'dist')
                    },
                ],
            }),
            new MiniCssExtractPlugin({
                filename: fileName('css'),
            }),

        ]
        if (isDev) {
            base.push(new ESLintPlugin())
        }
        return base
    }
    return {
        context: path.resolve(__dirname, 'src'),
        entry: {
            main: ['@babel/polyfill', './index.js']
        },
        resolve: {
            extensions: ['.js'],
            alias: {
                '@': path.resolve(__dirname, 'src'),
                '@core': path.resolve(__dirname, 'src', 'core')
            }
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: fileName('js'),
            clean: true
        },
        devServer: {
            port: '8000',
            // open: true,
            hot: true,
        },
        plugins: plugins(),
        devtool: isDev ? 'source-map' : false,
        module: {
            rules: [
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        MiniCssExtractPlugin.loader,
                        "css-loader",
                        "sass-loader",
                    ],
                },
                {
                    test: /\.m?js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                }
            ],
        },
    }
}
