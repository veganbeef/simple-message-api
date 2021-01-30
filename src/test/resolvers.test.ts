import { createMockServer } from './mockServer';
import { MESSAGES_QUERY } from './queries';


const { query, mutate } = createMockServer();

describe('messages resolver', () => {
  it('should fetch most recent messages', async () => {
    // TODO: add mock for dataSources get function once present
    const result = await query({ query: MESSAGES_QUERY });
    expect(result.errors).toBe(undefined);
  });
});