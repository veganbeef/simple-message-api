import { ApolloServer } from 'apollo-server-express';
import { ApolloServerTestClient, createTestClient} from 'apollo-server-testing';

import schema from '../schema/index';


export function createMockServer(): ApolloServerTestClient {
  const apolloServer = new ApolloServer({ schema });
  return createTestClient(apolloServer);
}
