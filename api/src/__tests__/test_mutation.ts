import supertest = require('supertest');
import { setupServer, sendQuery } from '../utils/test_utils';

let request: supertest.SuperTest<supertest.Test>;

describe('Testing GraphQL Mutation resolvers via POST requests: ', () => {
    beforeAll(async () => {
        const serverSetup = await setupServer();
        request = serverSetup.request;
    });
    describe('Testing createItem mutation: ', () => {
        it('Send createItem mutation with only required fields: ', async () => {
            const mutation = `
            mutation {
              createItem(name: "Pencil", price: 9.98) {
                id
                name
                price
                discount
              }
            }
            `;

            const res = await sendQuery(mutation, request);
            const data = res.body.data;
            expect(data).toBeTruthy();
            expect(data.createItem).toBeTruthy();
            expect(data.createItem.name).toBe('Pencil');
            expect(data.createItem.price).toBe(9.98);
            expect(data.createItem.discount).toBe(0);
        });

        it('Send createItem mutation twice with only required fields: ', async () => {
            const mutation1 = `
            mutation {
              createItem(name: "Pencil", price: 9.98) {
                id
                name
                price
                discount
              }
            }
            `;

            const mutation2 = `
            mutation {
              createItem(name: "Pencil2", price: 19.98) {
                id
                name
                price
                discount
              }
            }
            `;

            const res1 = await sendQuery(mutation1, request);
            const res2 = await sendQuery(mutation2, request);

            const data1 = res1.body.data;
            expect(data1).toBeTruthy();
            expect(data1.createItem).toBeTruthy();
            expect(data1.createItem.name).toBe('Pencil');
            expect(data1.createItem.price).toBe(9.98);
            expect(data1.createItem.discount).toBe(0);

            const data2 = res2.body.data;
            expect(data2).toBeTruthy();
            expect(data2.createItem).toBeTruthy();
            expect(data2.createItem.name).toBe('Pencil2');
            expect(data2.createItem.price).toBe(19.98);
            expect(data2.createItem.discount).toBe(0);
        });
    });
});
