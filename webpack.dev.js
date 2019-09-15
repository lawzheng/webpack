'use strict';

const glob = require('glob')
const path = require('path')
const webpack = require('webpack')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const setMPA = () => {
    const entry = {}
    const HtmlWebpackPlugins = []

    const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'))

    Object.keys(entryFiles)
        .map((index) => {
            const entryFile = entryFiles[index]

            const match = entryFile.match(/src\/(.*)\/index\.js/)
            const pageName = match && match[1]
            entry[pageName] = entryFile
            HtmlWebpackPlugins.push(
                new HtmlWebpackPlugin({
                    template: path.join(__dirname, `src/${pageName}/index.html`),
                    filename: `${pageName}.html`,
                    chunks: [`${pageName}`],  // 引入入口的js
                    inject: true,
                    minify: {
                        html5: true,
                        collapseWhitespace: true,
                        preserveLineBreaks: false,
                        minifyCSS: true,
                        minifyJS: true,
                        removeComments: false
                    }
                })
            )
        })


    return {
        entry,
        HtmlWebpackPlugins
    }
}

const { entry, HtmlWebpackPlugins } = setMPA()

module.exports = {
    entry: entry,
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    mode: 'none',
    module: {
        rules: [
            {
                test: /.js$/,
                use: 'babel-loader'
            },
            {
                test: /.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            // {
            //     test: /.(png|jpg|gif|jpeg)$/,
            //     use: 'file-loader'
            // },
            {
                test: /.(png|jpg|gif|jpeg)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10240
                    }
                }
            },
            {
                test: /.(woff|woff2|eot|ttf|otf)$/,
                use: 'file-loader'
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin()
    ].concat(HtmlWebpackPlugins),
    devServer: {
        contentBase: './dist',
        hot: true
    },
    devtool: 'source-map'
};