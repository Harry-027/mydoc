const cors = require('cors');
const { corsOptions, mongoConfig } = require('./app.constant');
const { setDbConnection, addRoutes, addBodyParser, errMiddleware } = require('./utils');


/** pipeline to initialize & set up various resources at the time of server start up. */
startPipeline = async (app) => {
    app.use(cors(corsOptions));
    global.db = await setDbConnection(mongoConfig);
    addBodyParser(app);
    addRoutes(app);
    app.use(errMiddleware);
}

module.exports = {
    startPipeline
};