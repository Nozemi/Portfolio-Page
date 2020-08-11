const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HandlebarsWebpackPlugin = require('handlebars-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
    entry: './src/app.ts',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"]
    },
    module: {
        rules: [
            {
                test: require.resolve('./src/app.ts'),
                use: [{
                    loader: 'expose-loader',
                    options: 'Library'
                }, {
                    loader: 'ts-loader'
                }],
                exclude: /node_modules/
            },
            {test: /\.(t|j)sx?$/, use: {loader: 'ts-loader'}, exclude: /node_modules/},
            {enforce: "pre", test: /\.js$/, exclude: /node_modules/, loader: "source-map-loader"},
            {
                test: /\.hbs$/,
                loader: 'handlebars-loader'
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            autoprefixer: {
                                browser: ["last 2 versions"]
                            },
                            plugins: () => [
                                autoprefixer
                            ]
                        }
                    },
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: "Bjørn-Tore Mediaa",
            template: "./src/templates/index.hbs",
            minify: {
                html5: true,
                collapseWhitespace: true,
                caseSensitive: true,
                removeComments: true,
                removeEmptyElements: false
            }
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name]-styles.css?t=" + new Date().getTime(),
            chunkFilename: "[id].css?t=" + new Date().getTime()
        }),
        new CopyWebpackPlugin([
            {from: 'assets/img', to: 'img'}
        ]),
    ],
    devtool: "source-map",
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 8080,
        host: '0.0.0.0'
    }
};