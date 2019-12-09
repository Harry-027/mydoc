const expect = require('chai').expect;

describe('db/connection', function () {

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
    });
});
