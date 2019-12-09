const td = require('testdouble');
const expect = require('chai').expect;
const httpMocks = require('node-mocks-http');
const { routes } = require('../routers/index');

describe('Routers', () => {

    it('should ask for proper route', async () => {
        const expectedResponse = { msg: 'try using valid api- /object/:key' };
        const mockReq = httpMocks.createRequest({
            method: 'GET',
            url: `/something`,
        });
        const mockRes = httpMocks.createResponse();
        await routes.helloWorld(mockReq, mockRes);
        const resData = JSON.parse(mockRes._getData());
        expect(resData).to.eql(expectedResponse);
    });

    it('should fetch the value of key', async () => {
        const expectedResponse = { key: 123, value: 'some-value' };
        const mockReq = httpMocks.createRequest({
            method: 'GET',
            url: `/object/123`,
        });
        const mockRes = httpMocks.createResponse();
        global.db = td.object();
        td.when(global.db.collection(td.matchers.anything())).thenReturn(global.db);
        td.when(global.db.findOne(td.matchers.anything())).thenResolve({
            key: 123, value: [
                {
                    value: 'some-value',
                    timestamp: 'some-timestamp'
                }
            ]
        });
        await routes.getKey(mockReq, mockRes);
        const resData = JSON.parse(mockRes._getData());
        expect(resData).to.eql(expectedResponse);
    });

    it('should save the key details', async () => {
        const reqBody = {
            key: '123',
            value: 'some-value'
        };
        const mockResponse = {
            value: {
                key: 123, value: [
                    {
                        value: 'some-value',
                        time: 'some-timestamp'
                    }
                ]
            }
        };
        const expectedResponse = { key: 123, value: 'some-value', timestamp: 'some-timestamp' };
        const mockReq = httpMocks.createRequest({
            method: 'POST',
            url: `/object/`,
            body: reqBody
        });
        const mockRes = httpMocks.createResponse();
        global.db = td.object();
        td.when(global.db.collection(td.matchers.anything())).thenReturn(global.db);
        td.when(global.db.findOneAndUpdate(td.matchers.anything(), td.matchers.anything(), td.matchers.anything())).thenResolve(mockResponse);
        await routes.postKey(mockReq, mockRes);
        const resData = JSON.parse(mockRes._getData());
        expect(resData).to.eql(expectedResponse);
    });
})