import { GraphQLServer } from 'graphql-yoga';

import { createContext } from './utils/context';
import Query from './gql/resolvers/Query';
import Mutation from './gql/resolvers/Mutation';

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
                server.start(() => console.log(`Sever is running on http://localhost:4000`));
            } catch (e) {
                console.log(e);
            }
        })();
    }
}

main();

export { app };
