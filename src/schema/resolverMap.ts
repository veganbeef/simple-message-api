import { IResolvers } from 'graphql-tools';

import { Message, MessageQueryInput, SendMessageInput } from './schema-types';


const resolverMap: IResolvers = {
  Query: {
    messages: async (parent: any, args: { options: MessageQueryInput }): Promise<Message[]> => {
      return [{content: 'test', recipient: 'me', sender: 'you', timestamp: new Date().toISOString()}];
    }
  },
  Mutation: {
    sendMessage: async (parent: any, args: { message: SendMessageInput }): Promise<Message> => {
      return { ...args.message, timestamp: new Date().toISOString() }
    }
  }
};

export default resolverMap;
