const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const absolutePath = relativePath => path.resolve(__dirname, relativePath);

module.exports = function(
    {
        assetsDir,
        sassPath,
        apiUrl,
        outputPath,
        apiHeaders = null,
        mockedApi = false,
        maxEndTime = '23:59',
        env = 'production',
        host = 'localhost',
        port = 3000,
    } = {},
) {
    const GLOBALS = {
        'process.env.NODE_ENV': JSON.stringify(env),
        __API_URL__: JSON.stringify(apiUrl),
        __API_HEADERS__: JSON.stringify(apiHeaders),
        __USE_MOCKED_API__: JSON.stringify(mockedApi),
        __MAXIMUM_END_TIME_ALLOWED__: JSON.stringify(maxEndTime),
    };

    const filesToCopy = [
        {
            from: absolutePath('src/manifest.json'),
            to: path.resolve(outputPath, 'manifest.json'),
        },
        {
            from: absolutePath('src/img/icon'),
            to: path.resolve(outputPath, 'icon'),
        },
    ];

    if (assetsDir) {
        filesToCopy.push({
            from: assetsDir,
            to: path.resolve(outputPath, path.basename(assetsDir)),
        });
    }

    const styleLoaders = ['css-loader?sourceMap', 'sass-loader?sourceMap'];

    if (sassPath) {
        styleLoaders.push({
            loader: 'sass-resources-loader',
            options: {
                resources: sassPath,
            },
        });
    }

    const webpackConfig = {
        target: 'web',
        devtool: 'source-map',
        entry: [absolutePath('src/js/index')],
        output: {
            path: outputPath,
            publicPath: '/',
            filename: 'bundle.[hash].js',
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: absolutePath('src/index.html'),
                favicon: absolutePath('src/img/icon/logo-2x.png'),
            }),
            new webpack.DefinePlugin(GLOBALS),
            new ExtractTextPlugin('styles.[hash].css'),
            new CopyWebpackPlugin(filesToCopy, { copyUnmodified: true }),
        ],
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: styleLoaders,
                    }),
                },
                {
                    test: /\.jsx?$/,
                    include: absolutePath('src'),
                    use: 'babel-loader',
                },
                {
                    test: /\.ya?ml$/,
                    use: ['json-loader', 'yaml-loader'],
                },
                {
                    test: /\.svg(\?v=\d+.\d+.\d+)?$/,
                    use: 'file-loader?limit=10000&mimetype=image/svg+xml',
                },
                {
                    test: /\.(jpe?g|png|gif)$/i,
                    use: 'file-loader',
                },
            ],
        },
        resolveLoader: {
            modules: ['node_modules', absolutePath('node_modules')],
        },
        devServer: {
            host: host,
            port: port,
            hot: false,
            overlay: true,
            inline: true,
        },
    };

    if (env === 'production') {
        webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({ sourceMap: true }));
    }

    if (env === 'development') {
        webpackConfig.module.rules.unshift({
            enforce: 'pre',
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'eslint-loader',
        });
    }

    return webpackConfig;
};
