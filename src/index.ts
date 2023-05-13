import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import { CookiesDataSource } from './dataSources/cookiesDataSource';
import { ToppingsDataSource } from './dataSources/toppingsDataSource';

import resolvers from './resolvers';
import typeDefs from './schema';

export type ApolloContext = {
    dataSources: {
        CookiesDataSource: CookiesDataSource,
        ToppingsDataSource: ToppingsDataSource;
    };
};

async function startApolloServer() {
    const server = new ApolloServer({ typeDefs, resolvers });

    const { url } = await startStandaloneServer(server, {
        context: async (): Promise<ApolloContext> => {
            const { cache } = server;

            return {
                dataSources: {
                    CookiesDataSource: new CookiesDataSource({ cache }),
                    ToppingsDataSource: new ToppingsDataSource({ cache })
                },
            };
        },
    });

    console.log(`
    🚀  Server is running
    📭  Query at ${url}
  `);
}

startApolloServer();
