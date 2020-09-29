import supertest = require('supertest');
import { Server } from 'http';

import { app } from '../index';

type ServerSetup = {
    server: Server;
    request: supertest.SuperTest<supertest.Test>;
};

export async function setupServer(): Promise<ServerSetup> {
    const server = (await app()).createHttpServer({});
    const request = supertest(server);
    return {
        server: server,
        request: request,
    };
}
