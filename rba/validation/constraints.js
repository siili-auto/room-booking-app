const validate = require('validate.js');
const fs = require('fs');
const moment = require('moment');

validate.validators.fileExists = (value) => {
    if (value && !fs.existsSync(value)) {
        return `file ${value} does not exists`;
    }
};

validate.validators.isBoolean = (value) => {
    if (value && !validate.isBoolean(value)) {
        return `has to be a boolean`;
    }
};

validate.validators.isTime = (value) => {
    if (value && !moment(value, 'H:mm').isValid()) {
        return 'has to be valid time in H:mm format, e.g "17:00"';
    }
};

const constraints = {
    apiUrl(value, attributes) {
        if (attributes.mockedApi === true) {
            return null;
        }

        return {
            presence: {
                allowEmpty: false,
            },
            url: {
                allowLocal: true,
            },
        };
    },
    assetsDir: {
        fileExists: true,
    },
    sassPath: {
        fileExists: true,
    },
    mockedApi: {
        isBoolean: true,
    },
    maxEndTime: {
        isTime: true
    },
};

module.exports = constraints;
