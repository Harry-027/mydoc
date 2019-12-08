const log4js = require('log4js');
const { loggerLevel } = require('./app.constant');

const logger = log4js.getLogger();
logger.level = loggerLevel.debug;


/** exported logger object to be used across app. */
module.exports = logger;