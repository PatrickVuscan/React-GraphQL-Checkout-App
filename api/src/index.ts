import { GraphQLServer } from 'graphql-yoga';
import Query from './gql/resolvers/Query';

const resolvers = {
    Query,
};

async function app(): Promise<GraphQLServer> {
    const server = new GraphQLServer({
        typeDefs: './src/gql/schema.graphql',
        resolvers,
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
