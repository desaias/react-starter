const HtmlPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const SRC_PATH = path.join(__dirname, '../src');

module.exports = {
    entry: {
        main: './src/main.js',
        vendor: './src/vendor.js',
    },

    output: {
        filename: '[name].[hash:8].js',
        path: path.resolve(__dirname, '../dist')
    },

    module: {
        rules: [{
            enforce: 'pre',
            test: /\.(js|jsx)$/,
            loader: 'eslint-loader',
            include: SRC_PATH,
        },
        {
            test: /\.(js|jsx)$/,
            loader: 'babel-loader',
            include: SRC_PATH,
        },
        {
            test: /\.css$/,
            include: SRC_PATH,
            loader: ExtractTextPlugin.extract({
                notExtractLoader: 'style-loader',
                loader: [
                    {
                        loader: 'css-loader',
                        query: {
                            modules: true,
                            sourceMaps: true,
                        }
                    },
                    'postcss-loader',
                ]
            }),
        },
        {
            test: /\.css$/,
            include: /node_modules/,
            loader: ExtractTextPlugin.extract({
                notExtractLoader: 'style-loader',
                loader: 'css-loader'
            }),
        },
        {
            test: /\.(jpg|png|svg)$/,
            loader: 'file',
            query: {
                name: '[name].[hash].[ext]'
            }
        },
        {
            test: /\.(eot|ttf|woff|woff2)$/,
            loader: 'url',
            query: {
                name: '[name].[hash].[ext]',
                limit: 25000,
            }
        }]
    },

    resolve: {
        modules: [SRC_PATH, 'node_modules'],
        extensions: ['.js', '.jsx', '.json']
    },

    plugins: [
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: [
                    require('precss')(),
                    require('postcss-cssnext')({
                        browsers: ['last 2 versions', 'ie > 10']
                    }),
                    require('postcss-reporter')({
                        clearMessages: true
                    }),
                ]
            }
        }),
        new HtmlPlugin({
            title: 'React Redux Webpack2 Starter',
            template: './src/index.html',
            favicon: './src/assets/images/favicon.ico',
            inject: true,
        }),
        new ExtractTextPlugin({
            filename: 'main.css',
            allChunks: true,
        }),
    ],

};
