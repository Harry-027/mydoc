
const MongoClient = require('mongodb').MongoClient;
const expect = require('chai').expect;
const sinon = require('sinon');

describe('db/connection', function () {

    const mongoClientMock = ({},{}) => {
        return {
            connect: () => {
                return new Promise((res, rej) => {
                    res({
                        db: ({ }) => {
                            return { db: 'Im db object' }
                        }
                    });
                });
            }
        }
    }

    sinon.spy(MongoClient,mongoClientMock);

    const MongoConn = require('../db/connection');

    describe('MongoConnection', function () {

        describe('#constructor(options)', function () {
            it('requires options.host', function () {
                expect(function () {
                    new MongoConn()
                }).to.throw(Error);
                expect(function () {
                    new MongoConn({ host: 'host' })
                }).not.to.throw(Error);
            });
            it('has additional opts: db, user, password', function () {
                const connUtil = new MongoConn({
                    host: 'localhost', db: 'test', user: 'world', password: 'pass'
                });
                expect(connUtil).to.have.property('host', 'localhost')
                expect(connUtil).to.have.property('db', 'test')
                expect(connUtil).to.have.property('user', 'world')
                expect(connUtil).to.have.property('password', 'pass')
            });
        })

        describe('#getConnectionUri()', function () {
            it('gives the mongo uri', function () {
                const uri = new MongoConn({ host: 'localhost' }).getConnectionUri();
                expect(uri).to.equal('mongodb://localhost/');
            });
        });

        describe('#connectToDb', function () {
            it('connects to the mongo database', async function () {
                const connUtil = new MongoConn({
                    host: 'localhost', db: 'test', user: 'world', password: 'pass'
                });
                const db = await connUtil.connect();
                console.log('The db',db);
            });
        });
    });
});
