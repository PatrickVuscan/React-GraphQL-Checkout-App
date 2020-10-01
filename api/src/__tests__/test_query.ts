import supertest = require('supertest');
import { Item } from '@prisma/client';
import { setupServer, sendQuery, createTestItem, createTestItemQuery } from '../utils/test_utils';

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
        it('Send item query to database with one item: ', async () => {
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

            const item = await createTestItem(createTestItemQuery('Pencil', 9.98), request);

            const res = await sendQuery(query, request);
            const data = res.body.data;
            expect(data).toBeTruthy();

            const _item = data.item;
            expect(_item.name).toBe(item.name);
            expect(_item.price).toBe(item.price);
            expect(_item.discount).toBe(item.discount);
        });
    });

    describe('Testing items query: ', () => {
        it('Send items query: ', async () => {
            const query = `
            query {
                items {
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
            expect(data.items).toBeTruthy();

            const first_item: Item = data.items[0];

            expect(first_item.name).toBe('Pencil');
            expect(first_item.price).toBe(9.98);
        });
    });
});
