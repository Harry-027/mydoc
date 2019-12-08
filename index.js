const express = require('express');
const logger = require('./utils/logger');
const { startPipeline } = require('./utils/pipeline');

let app = express();

/** Server startup after various resources have been initialized. */
startPipeline(app)
    .then(() => {
        app.listen(process.env.PORT || 3000, () => {
            logger.debug('Server started on port: 3000');
        });
    })
    .catch((err) => {
        logger.debug('An error occurred while executing the pipeline', err);
    });
