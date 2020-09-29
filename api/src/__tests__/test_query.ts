import supertest = require('supertest');
import { setupServer, sendQuery } from '../utils/test_utils';

let request: supertest.SuperTest<supertest.Test>;

describe('Testing GraphQL Query resolvers via GET requests: ', () => {
    beforeAll(async () => {
        const serverSetup = await setupServer();
        request = serverSetup.request;
    });
    describe('Testing info query: ', () => {
        it('Send info query GET request: ', async () => {
            const query = `
            query {
                info
            }
            `;

            const res = await sendQuery(query, request);

            expect(res.body.data).toBeTruthy();
        });
    });

    describe('Testing item query: ', () => {
        it('Send item query to empty database: ', async () => {
            const query = `
            query {
                item(id: 1) {
                  id
                  price
                  name
                  discount
                }
              }
            `;

            const res = await sendQuery(query, request);

            const data = res.body.data;
            expect(data).toBeTruthy();
            expect(data.item).toBeNull();
        });
    });
});
