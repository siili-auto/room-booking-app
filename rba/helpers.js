const path = require('path');
const validate = require('./validation');

const cwdPath = src => path.resolve(process.cwd(), src);

const parseConfig = (userConfig, callback) => {
    const config = {
        ...userConfig,
        sassPath: userConfig.sassPath && cwdPath(userConfig.sassPath),
        assetsDir: userConfig.assetsDir && cwdPath(userConfig.assetsDir),
    };
    return callback(validate(config), config);
};

module.exports = { cwdPath, parseConfig };
