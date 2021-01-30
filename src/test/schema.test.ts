import { graphql } from 'graphql';
import { addMocksToSchema } from 'graphql-tools';

import schema from '../schema';
import { MESSAGES_QUERY } from './queries';
import {messagesQueryResponse} from './queryResponses';

addMocksToSchema({
  schema,
  preserveResolvers: false,
  mocks: {
    Int: () => 3,
    Boolean: () => true,
    String: () => 'Hello, world!'
  }
});

describe('schema', () => {
  it('should return expected messages query result', async () => {
    const response = await graphql(schema, MESSAGES_QUERY);
    expect(response).toEqual(messagesQueryResponse);
  });
});