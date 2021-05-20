const DotEnv = require('dotenv');
const path = require('path');
const fileName = process.env.ENV_FILE ? '.env.' + process.env.ENV_FILE : '.env';
const parsedEnv = DotEnv.config({path: path.join(process.cwd(), fileName)}).parsed;
module.exports = function () {
    return parsedEnv
};
