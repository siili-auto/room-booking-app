const webpack = require('webpack');
const chalk = require('chalk');
const helpers = require('./helpers');
const webpackConfig = require('../webpack.config');

module.exports = (args, options, logger) => {
    const configPath = helpers.cwdPath(args.config);

    logger.info(`Config file: ${configPath}`);

    helpers.parseConfig(require(configPath), (err, userConfig) => {
        if (err) {
            logger.error('\nInvalid config provided, details:', err);
            process.exit(1);
        }
        const config = {
            ...userConfig,
            outputPath: helpers.cwdPath(args.output),
        };
        const compiler = webpack(webpackConfig(config));
        logger.info(config);

        logger.info('\nBuilding...');
        compiler.run((err, stats) => {
            if (err) {
                logger.error(err.stack || err);
                if (err.details) {
                    logger.error(err.details);
                }
                process.exit(1);
            }

            const info = stats.toJson();

            if (stats.hasErrors()) {
                logger.error(info.errors);
            } else if (stats.hasWarnings()) {
                logger.warn(info.warnings);
            } else {
                logger.info(chalk.green('Done!'));
            }
        });
    });
};
