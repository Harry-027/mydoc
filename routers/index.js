const app = require('express');
const logger = require('../utils/logger');

const router = app.Router();


/** handler to fetch the record from db. */
const getKey = async (req, res, next) => {
    try {
        const key = req.params.key;
        const time = req.query ? req.query.timestamp : null;
        let response = null;
        logger.debug(`key & timestamp obtained from request, key: ${key}, timestamp: ${time}`);
        const filterCriteriaOn = (time && !isNaN(time));
        logger.debug(`If result required to be filtered based on timestamp: ${filterCriteriaOn}`);

        logger.debug('Fetching result from db');
        const result = await db.collection('key').findOne({ key });

        if (result && result.value) {
            const valLength = result.value.length;
            response = {
                key: result.key,
                value: result.value[valLength - 1].value
            }

            if (filterCriteriaOn) {
                let filteredValues = result.value.filter((val) => {
                    return new Date(val.time).getTime() <= time;
                });
                response.value = filteredValues[filteredValues.length - 1].value;
            }
        }
        logger.debug('Responding back to the user', response);
        response = response && response.value ? response : 'No records found';
        res.json(response);

    } catch (err) {
        next(err);
    }
}

const helloWorld = async (req, res, next) => {
    res.json({msg: 'try using valid api- /object/:key'});
}

/** handler to store the record in db. */
const postKey = async (req, res, next) => {
    try {
        const body = req.body;
        logger.debug('saving result to db');
        const result = await db.collection('key').findOneAndUpdate({ key: body.key }, {
            $push: {
                value: {
                    value: body.value,
                    time: new Date()
                }
            }
        },
            {
                upsert: true,
                returnOriginal: false
            });

        logger.debug('setting the response for user');
        const len = result.value.value.length;
        const response = {
            key: result.value['key'],
            value: result.value['value'][len - 1]['value'],
            timestamp: result.value['value'][len - 1]['time']
        }
        logger.debug('Responding back to the user');
        res.json(response);
    } catch (err) {
        next(err);
    }
}

router.get('/object/:key', getKey);
router.post('/object/', postKey)
router.get('*', helloWorld);

module.exports = router;