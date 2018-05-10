const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const chalk = require('chalk');
const opn = require('opn');
const helpers = require('./helpers');
const webpackConfig = require('../webpack.config');

module.exports = (args, options, logger) => {
    const configPath = helpers.cwdPath(args.config);

    const url = `http://${options.host}:${options.port}`;

    logger.info(`Config file path: ${configPath}`);
    logger.info('Starting server: ' + chalk.bold(url));

    helpers.parseConfig(require(configPath), (err, userConfig) => {
        if (err) {
            logger.error('\nInvalid config provided, details:', err);
            process.exit(1);
        }

        const configArgs = {
            ...userConfig,
            outputPath: helpers.cwdPath('tmp'),
            env: 'development',
        };

        logger.info(configArgs);

        const config = webpackConfig(configArgs);
        config.entry.unshift(`webpack-dev-server/client?${url}`);

        const compiler = webpack(config);

        const server = new WebpackDevServer(compiler, {
            stats: {
                colors: true,
            },
        });

        server.listen(options.port, options.host, () => {
            logger.info(chalk.green('\nServer started: ' + chalk.bold(url)));
            opn(url);
        });
    });
};
