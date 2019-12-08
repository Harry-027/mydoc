/** Constants to be used at application level. */

require('dotenv').config();

const loggerLevel = {
    info: 'info',
    debug: 'debug',
    fatal: 'fatal',
    error: 'error'
};

const corsOptions = {
    origin: process.env.ORIGIN,
    optionsSuccessStatus: 200
}

const mongoConfig = {
    host: process.env.HOST,
    db: process.env.DB
}

console.log('mongoConfig',mongoConfig);

module.exports = {
    loggerLevel,
    corsOptions,
    mongoConfig
}