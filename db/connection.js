const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const logger = require('../utils/logger');

/**
 * Class representing methods & properties for connecting to db.
 */
class Connection {

    /** Initializes various configuration values. */
    constructor(config) {
        assert.notEqual(config.host, null);
        this.host = config.host;
        this.db = config.db;
        this.user = config.user;
        this.password = config.password;
    }

    /** helps client to connect to db. */
    connect() {
        return new Promise(async (res, rej) => {
            try {
                const uri = this.getConnectionUri();
                this.client = new MongoClient(uri, { useUnifiedTopology: true });
                const connectionInstance = await this.client.connect();
                const db = connectionInstance.db(this.db);
                res(db);
            } catch (err) {
                logger.debug(`An error occurred while connecting to Mongo Server: ${err}`);
                rej(err);
            }
        });
    }

    /** Closes the connection to db. */
    close() {
        this.client.close();
    }

    /**
     * Forms the connection uri to connect to db
     * @returns {string} uri - uri string to connect to db.
    */
    getConnectionUri() {
        let uri = 'mongodb://';
        if (this.user) {
            uri += this.user;
            if (this.password) {
                uri += ':' + this.password;
            }
            uri += '@';
        }
        uri += this.host + '/';
        if (this.db) {
            uri += this.db;
        }
        return uri;
    }
}

module.exports = Connection;