import { GraphQLServer } from 'graphql-yoga';
import dotenv = require('dotenv');

import { createContext } from './utils/context';
import Query from './gql/resolvers/Query';
import Mutation from './gql/resolvers/Mutation';

dotenv.config();

const server_options = {
    port: Number(process.env.PORT),
    deduplicator: true,
};

const resolvers = {
    Query,
    Mutation,
};

async function app(): Promise<GraphQLServer> {
    const server = new GraphQLServer({
        typeDefs: './src/gql/schema.graphql',
        resolvers,
        context: (request: any) => {
            return createContext(request);
        },
    });

    return server;
}

function main() {
    if (require.main == module) {
        (async () => {
            try {
                const server = await app();
                server.createHttpServer(server_options).listen(server_options.port, '0.0.0.0', () => {
                    console.log(`Sever is running on http://${process.env.HOST}:${server_options.port}`);
                });
            } catch (e) {
                console.log(e);
            }
        })();
    }
}

main();

export { app };
