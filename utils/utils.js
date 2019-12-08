const bodyParser = require('body-parser');
const logger = require('./logger');
const router = require('../routers/index');
const Connection = require('../db/connection');


/** Util method to set up the connection to db & return bak the connection object. */
const setDbConnection = async (config) => {
    try {
        const driver = new Connection(config);
        const db = await driver.connect();
        return db;
    } catch (err) {
        logger.debug('An error occurred while connecting with Mongo server', err);
        throw err;
    }
}

/** Util to add the body parser as middleware. */
const addBodyParser = (app) => {
    app.use(bodyParser.json({ limit: '5kb' }));
    logger.debug('Body parse added');
    app.use(bodyParser.urlencoded({
        limit: '5kb',
        extended: false
    }));
}

/** Util to setup various routes. */
const addRoutes = (app) => {
    app.use('/', router);
}

const errMiddleware = (err, req, res, next) => {
    if (err) {
        res.json({ errorcode: 500, msg: 'An internal server error occurred' });
    }
    next();
}

module.exports = {
    setDbConnection,
    addBodyParser,
    addRoutes,
    errMiddleware
}