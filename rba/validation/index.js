const validate = require('validate.js');
const constraints = require('./constraints');

const validateUserConfig = userConfig => {
    return validate(userConfig, constraints);
};

module.exports = validateUserConfig;