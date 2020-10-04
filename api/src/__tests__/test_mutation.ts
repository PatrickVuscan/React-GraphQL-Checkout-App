import supertest = require('supertest');
import { Item } from '@prisma/client';
import { setupServer, sendQuery, createTestItem, createTestItemQuery } from '../utils/test_utils';

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

    describe('Testing updateItem mutation: ', () => {
        it('Send updateItem mutation with nonexistent id', async () => {
            const mutation = `
            mutation {
              updateItem(id: -1) {
                id
                name 
                price
                discount
              }
            }
            `;
            const res = await sendQuery(mutation, request);

            expect(res.body.data).toBeTruthy();

            const data = res.body.data;
            expect(data).toBeTruthy();

            const errors = res.body.errors;
            expect(errors).toBeTruthy();

            const _item: Item = data.updateItem;
            expect(_item).toBeNull();
        });

        it('Send updateItem mutation without modifying pre-existing values', async () => {
            const item = await createTestItem(createTestItemQuery('Crayon', 4.98, 0.1), request);

            const mutation = `
            mutation {
              updateItem(id: ${item.id}) {
                id
                name
                price
                discount
              }
            }
            `;

            const res = await sendQuery(mutation, request);

            expect(res.body.data).toBeTruthy();
            const data = res.body.data;

            const _item: Item = data.updateItem;
            expect(_item).toBeTruthy();
            expect(_item.id).toBe(item.id);
            expect(_item.name).toBe(item.name);
            expect(_item.price).toBe(item.price);
            expect(_item.discount).toBe(item.discount);
        });

        it('Send updateItem mutation with changing only price', async () => {
            const item = await createTestItem(createTestItemQuery('Crayon', 4.98, 0.1), request);

            const mutation = `
            mutation {
              updateItem(id: ${item.id}, price: 99.98) {
                id
                name
                price
                discount
              }
            }
            `;

            const res = await sendQuery(mutation, request);

            expect(res.body.data).toBeTruthy();

            const data = res.body.data;
            expect(data).toBeTruthy();

            const _item: Item = data.updateItem;
            expect(_item).toBeTruthy();
            expect(_item.id).toBe(item.id);
            expect(_item.name).toBe(item.name);
            expect(_item.price).toBe(99.98);
            expect(_item.discount).toBe(item.discount);
        });

        it('Send updateItem mutation with changing all values', async () => {
            const item = await createTestItem(createTestItemQuery('Crayon', 4.98, 0.1), request);

            const mutation = `
            mutation {
              updateItem(id: ${item.id}, price: 99.98, name: "old-fashion", discount: 0.9999) {
                id
                name
                price
                discount
              }
            }
            `;

            const res = await sendQuery(mutation, request);

            expect(res.body.data).toBeTruthy();

            const data = res.body.data;
            expect(data).toBeTruthy();

            const _item: Item = data.updateItem;
            expect(_item).toBeTruthy();
            expect(_item.id).toBe(item.id);
            expect(_item.name).toBe('old-fashion');
            expect(_item.price).toBe(99.98);
            expect(_item.discount).toBe(0.9999);
        });
    });
    describe('Testing deleteItem mutation: ', () => {
        it('Send deleteItem mutation with nonexistent id', async () => {
            const mutation = `
            mutation {
              deleteItem(id: -1) {
                id
                discount
                name
                price
              }
            }
            `;
            const res = await sendQuery(mutation, request);

            expect(res.body.data).toBeTruthy();

            const data = res.body.data;
            expect(data).toBeTruthy();
            const errors = res.body.errors;

            expect(errors).toBeTruthy();

            const _item: Item | null = data.deleteItem;
            expect(_item).toBeNull();
        });

        it('Send deleteItem mutation with nonexistent id', async () => {
            const mutation = `
            mutation {
              deleteItem(id: -1) {
                id
                discount
                name
                price
              }
            }
            `;
            const res = await sendQuery(mutation, request);

            expect(res.body.data).toBeTruthy();

            const data = res.body.data;
            expect(data).toBeTruthy();

            const errors = res.body.errors;
            expect(errors).toBeTruthy();

            const _item: Item | null = data.deleteItem;
            expect(_item).toBeNull();
        });

        it('Send deleteItem mutation with created item id, then check that item no longer exists', async () => {
            const item = await createTestItem(createTestItemQuery('Crayon', 4.98, 0.1), request);
            const mutation = `
            mutation {
              deleteItem(id: ${item.id}) {
                id
                discount
                name
                price
              }
            }
            `;
            const res = await sendQuery(mutation, request);

            expect(res.body.data).toBeTruthy();

            const data = res.body.data;
            expect(data).toBeTruthy();

            const errors = res.body.errors;
            expect(errors).toBeFalsy();

            const _item: Item = data.deleteItem;
            expect(_item).toBeTruthy();

            expect(_item.id).toBe(item.id);
            expect(_item.name).toBe(item.name);
            expect(_item.price).toBe(item.price);
            expect(_item.discount).toBe(item.discount);

            const query = `
            query {
              item(id: ${item.id}) {
                id
              }
            }
            `;

            const res2 = await sendQuery(query, request);
            expect(res2.body.data).toBeTruthy();

            const data2 = res2.body.data;
            expect(data2).toBeTruthy();

            const _item2: Item = data2.item;
            expect(_item2).toBeNull();
        });
    });
});
